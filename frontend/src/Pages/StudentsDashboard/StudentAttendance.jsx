import React, { useState } from 'react';
import './StudentAttendance.css';
import SideBarStudent from '../../components/SideBar-student.jsx';
import Header from '../../components/Header.jsx';
import { ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler } from 'chart.js';
import AIChat from '../../components/AiChat.jsx';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler);

// --- MOCK DATA (Updated for Nov 6, 2025) ---
const attendanceData = [
    { code: 'CS-501', name: 'Computer Networks', totalClasses: 50, attendedClasses: 45 },
    { code: 'CS-502', name: 'Theory of Computation', totalClasses: 48, attendedClasses: 42 },
    { code: 'CS-503', name: 'Compiler Design', totalClasses: 40, attendedClasses: 30 },
];

const dayToDayData = {
    '2025-11-05': [
        { name: 'Compiler Design (CS-503)', time: '11:00AM - 11:50 AM', status: 'Absent' },
    ],
    '2025-11-06': [
        { name: 'Computer Networks (CS-501)', time: '09:00AM - 09:50 AM', status: 'Present' },
        { name: 'Theory of Computation (CS-502)', time: '10:00AM - 10:50 AM', status: 'Present' },
    ],
};

const courseSpecificAttendance = {
    'CS-501': { '2025-10-01': 'Present', '2025-10-03': 'Present', '2025-10-06': 'Present', '2025-10-08': 'Present', '2025-10-10': 'Present', '2025-10-13': 'Absent', '2025-10-15': 'Present', '2025-10-17': 'Present', '2025-10-20': 'Present', '2025-10-22': 'Present', '2025-10-24': 'Present', '2025-10-27': 'Present', '2025-10-29': 'Present', '2025-10-31': 'Present', '2025-11-03': 'Present', '2025-11-06': 'Present', },
    'CS-502': { '2025-10-02': 'Present', '2025-10-07': 'Present', '2025-10-09': 'Absent', '2025-10-14': 'Present', '2025-10-16': 'Present', '2025-10-21': 'Present', '2025-10-23': 'Present', '2025-10-28': 'Present', '2025-10-30': 'Absent', '2025-11-04': 'Present', '2025-11-06': 'Present', },
    'CS-503': { '2025-10-02': 'Present', '2025-10-07': 'Present', '2025-10-09': 'Present', '2025-10-14': 'Present', '2025-10-16': 'Present', '2025-10-21': 'Present', '2025-10-23': 'Absent', '2025-10-28': 'Absent', '2025-10-30': 'Present', '2025-11-04': 'Present', '2025-11-05': 'Absent' }
};

const courseChartData = {
    'CS-501': { labels: ['03/09', '10/09', '17/09', '24/09', '01/10', '08/10', '15/10', '22/10', '29/10', '05/11'], values: [100, 100, 100, 95, 92, 94, 95, 90, 91, 90] },
    'CS-502': { labels: ['04/09', '11/09', '18/09', '25/09', '02/10', '09/10', '16/10', '23/10', '30/10', '06/11'], values: [100, 100, 91, 92, 93, 90, 85, 86, 87, 84] },
    'CS-503': { labels: ['04/09', '11/09', '18/09', '25/09', '02/10', '09/10', '16/10', '23/10', '30/10', '05/11'], values: [100, 95, 90, 88, 85, 82, 80, 75, 70, 68] }
};
// --- END OF MOCK DATA ---

const calculatePercentage = (attended, total) => {
    return total === 0 ? 0 : Math.round((attended / total) * 100);
};

// --- Circular Progress Component ---
const CircularProgress = ({ percentage }) => {
    const radius = 30;
    const stroke = 5;
    const normalizedRadius = radius - stroke * 2;
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;
    return (
        <svg height={radius * 2} width={radius * 2} className="progress-ring">
            <circle className="progress-ring-bg" strokeWidth={stroke} r={normalizedRadius} cx={radius} cy={radius} />
            <circle className="progress-ring-fg" strokeWidth={stroke} strokeDasharray={circumference + ' ' + circumference} style={{ strokeDashoffset }} r={normalizedRadius} cx={radius} cy={radius} />
            <text x="50%" y="50%" textAnchor="middle" dy=".3em" className="progress-ring-text">{`${percentage}`}</text>
        </svg>
    );
};

// --- Calendar Component for Day-to-Day tab ---
const Calendar = ({ selectedDate, setSelectedDate }) => {
    // UPDATED: Default month is now November 2025 (month 10)
    const [currentMonth, setCurrentMonth] = useState(new Date(2025, 10, 1));
    const renderHeader = () => (<div className="calendar-header"><button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}><ChevronLeft size={20} /></button><span>{new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentMonth)}</span><button onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}><ChevronRight size={20} /></button></div>);
    const renderDays = () => (<div className="calendar-days">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day}>{day}</div>)}</div>);
    const renderCells = () => {
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const startDate = new Date(monthStart);
        startDate.setDate(1 - monthStart.getDay());
        const cells = [];
        let day = new Date(startDate);
        while (day <= monthEnd || cells.length % 7 !== 0 || cells.length < 35) {
            const formattedDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
            const isSelected = selectedDate === formattedDate;
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
            cells.push(<div key={day} className={`calendar-cell ${!isCurrentMonth ? 'disabled' : ''} ${isSelected ? 'selected' : ''}`} onClick={() => isCurrentMonth && setSelectedDate(formattedDate)}>{day.getDate()}</div>);
            day.setDate(day.getDate() + 1);
        }
        return <div className="calendar-grid">{cells}</div>;
    };
    return <div className="calendar-container">{renderHeader()}{renderDays()}{renderCells()}</div>;
};

const AttendanceChart = ({ data }) => {
    const chartOptions = { responsive: true, maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100, ticks: { color: 'rgba(238, 238, 238, 0.7)', callback: (value) => `${value}%` }, grid: { color: 'rgba(255, 255, 255, 0.1)', drawBorder: false } }, x: { ticks: { color: 'rgba(238, 238, 238, 0.7)' }, grid: { display: false } } }, plugins: { legend: { display: false }, tooltip: { enabled: true, backgroundColor: '#1c1c1c', titleColor: '#eeeeee', bodyColor: '#eeeeee' } }, elements: { line: { tension: 0.3 } } };
    const chartData = { labels: data.labels, datasets: [{ label: 'Attendance %', data: data.values, fill: false, borderColor: '#3b82f6', backgroundColor: '#3b82f6', pointBackgroundColor: '#fff', pointBorderColor: '#3b82f6', pointRadius: 4, pointHoverRadius: 6 }] };
    return <div className="chart-container"><Line options={chartOptions} data={chartData} /></div>;
};

const DetailCalendar = ({ attendance }) => {
    // UPDATED: Default month is now November 2025 (month 10)
    const [currentMonth] = useState(new Date(2025, 10, 1));
    const renderHeader = () => (<div className="calendar-header"><button disabled><ChevronLeft size={20} /></button><span>{new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(currentMonth)}</span><button disabled><ChevronRight size={20} /></button></div>);
    const renderDays = () => (<div className="calendar-days">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => <div key={day}>{day}</div>)}</div>);
    const renderCells = () => {
        const monthStart = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const monthEnd = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
        const startDate = new Date(monthStart);
        startDate.setDate(1 - monthStart.getDay());
        const cells = [];
        let day = new Date(startDate);
        while (day <= monthEnd || cells.length % 7 !== 0 || cells.length < 35) {
            const formattedDate = `${day.getFullYear()}-${String(day.getMonth() + 1).padStart(2, '0')}-${String(day.getDate()).padStart(2, '0')}`;
            const status = attendance[formattedDate];
            const isCurrentMonth = day.getMonth() === currentMonth.getMonth();
            cells.push(<div key={day} className={`calendar-cell ${!isCurrentMonth ? 'disabled' : ''}`}><span className={status ? `status-dot ${status.toLowerCase()}` : ''}>{day.getDate()}</span></div>);
            day.setDate(day.getDate() + 1);
        }
        return <div className="calendar-grid">{cells}</div>;
    };
    return <div className="calendar-container">{renderHeader()}{renderDays()}{renderCells()}</div>;
};

const CourseDetailView = ({ course, onBack, lang }) => {
    const dailyData = courseSpecificAttendance[course.code] || {};
    const historicalData = courseChartData[course.code];
    return (
        <div className="course-detail-view">
            <div className="detail-view-header">
                <button onClick={onBack} className="back-button"><ArrowLeft size={20} /> {lang === 'hi' ? 'वापस' : 'Back'}</button>
                <h3>{course.name}</h3>
            </div>
            {historicalData ? (<> <DetailCalendar attendance={dailyData} lang={lang} /> <AttendanceChart data={historicalData} lang={lang} /> </>) : (<div className="no-data-message">{lang === 'hi' ? 'इस विषय के लिए विस्तृत उपस्थिति डेटा उपलब्ध नहीं है।' : 'Detailed attendance data is not available for this subject.'}</div>)}
        </div>
    );
};

export default function StudentAttendance() {
    const [activeTab, setActiveTab] = useState('overview');
    // UPDATED: Default selected date is now Nov 6, 2025
    const [selectedDate, setSelectedDate] = useState('2025-11-06');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const todaysClasses = dayToDayData[selectedDate] || [];
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");

    const altTitle = "मेरी उपस्थिति";
    const altSubtitle = "वर्तमान सेमेस्टर के लिए अपनी उपस्थिति ट्रैक करें";
    
    const statusTranslations = {
        en: { Present: "Present", Absent: "Absent" },
        hi: { Present: "उपस्थित", Absent: "अनुपस्थित" }
    };
    
    return (
        <div className="page-layout">
            <SideBarStudent activePage={"attendance"} />
            <main className="main-content">
                <Header title="My Attendance" subtitle="Track your attendance for the current semester" altTitle={altTitle} altSubtitle={altSubtitle} lang={lang} onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")} />
                <div className="attendance-page">
                    <div className="attendance-content-container">
                        {!selectedCourse && (
                            <div className="tab-switcher">
                                <button className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>{lang === 'hi' ? 'अवलोकन' : 'Overview'}</button>
                                <button className={`tab-button ${activeTab === 'day-to-day' ? 'active' : ''}`} onClick={() => setActiveTab('day-to-day')}>{lang === 'hi' ? 'दिन-प्रतिदिन' : 'Day-to-Day'}</button>
                            </div>
                        )}
                        <div className="tab-content">
                            {activeTab === 'overview' ? (
                                selectedCourse ? (
                                    <CourseDetailView course={selectedCourse} onBack={() => setSelectedCourse(null)} lang={lang} />
                                ) : (
                                    <div className="overview-section">
                                        {attendanceData.map((course, idx) => {
                                            const percentage = calculatePercentage(course.attendedClasses, course.totalClasses);
                                            const neededClasses = Math.ceil(course.totalClasses * 0.75) - course.attendedClasses;
                                            return (
                                                <div key={idx} className="attendance-list-item" onClick={() => setSelectedCourse(course)}>
                                                    <div className="course-details">
                                                        <span className="course-name">{course.name}</span>
                                                        <span className="course-code">{course.code}</span>
                                                    </div>
                                                    <div className="attendance-stats">
                                                        <div className="progress-container">
                                                            <CircularProgress percentage={percentage} />
                                                        </div>
                                                        <div className="stats-text">
                                                            <span>{`${course.attendedClasses} / ${course.totalClasses}`}</span>
                                                            <span className={percentage < 75 ? 'status-low' : 'status-ok'}>
                                                                {percentage < 75 
                                                                    ? (lang === 'hi' ? `${neededClasses} और कक्षाओं में उपस्थित हों` : `Attend ${neededClasses} more`)
                                                                    : (lang === 'hi' ? 'सही रास्ते पर' : 'On Track')}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )
                            ) : (
                                <div className="day-to-day-section">
                                    <Calendar selectedDate={selectedDate} setSelectedDate={setSelectedDate} lang={lang} />
                                    <div className="daily-classes-list">
                                        {todaysClasses.length > 0 ? (
                                            todaysClasses.map((cls, idx) => (
                                                <div key={idx} className="daily-class-item">
                                                    <div className="class-info"><span className="class-name">{cls.name}</span><span className={`class-status status-${cls.status.toLowerCase()}`}>{statusTranslations[lang][cls.status]}</span></div>
                                                    <div className="class-time">{cls.time}</div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="no-classes-message">{lang === 'hi' ? 'इस दिन के लिए कोई कक्षा निर्धारित नहीं है।' : 'No classes scheduled for this day.'}</div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <button className="s-fab-chat-btn" onClick={() => setShowChat(true)}>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M8 15s1.5-2 4-2 4 2 4 2" /><path d="M9 9h.01" /><path d="M15 9h.01" /></svg>
                </button>
                {showChat && <AIChat onClose={() => setShowChat(false)} />}
            </main>
        </div>
    );
}