import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './SideBar-student.css';
import {
    LayoutGrid,
    LayoutDashboard,
    CalendarDays,
    BookOpen,
    Star,
    ClipboardCheck,
    GraduationCap,
    Bell,
    Coffee,
    Menu,
    StickyNote, // Added for Notes
    LifeBuoy    // Added for Support
} from "lucide-react";

export default function SideBarStudent({ activePage = "" }) {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [lang] = useState("en"); // Hardcoded to 'en' for now

    activePage = activePage.toLowerCase(); // ✅ Ensures matching works consistently

    const labels = {
        dashboard: lang === "hi" ? "डैशबोर्ड" : "Dashboard",
        timetable: lang === "hi" ? "समय सारणी" : "Timetable",
        courses: lang === "hi" ? "पाठ्यक्रम" : "Courses",
        attendance: lang === "hi" ? "उपस्थिति" : "Attendance",
        grades: lang === "hi" ? "अंक" : "Grades",
        notifications: lang === "hi" ? "सूचनाएँ" : "Notifications",
        studentDashboard: lang === "hi" ? "छात्र डैशबोर्ड" : "Student Dashboard",
        jcafe: lang === "hi" ? "जे कैफे" : "JCafe",
        notes: lang === "hi" ? "नोट्स" : "Notes", // Added Notes label
        support: lang === "hi" ? "सहायता" : "Support", // Added Support label
        Opportunities: lang === "hi" ? "अवसर" : "Opportunities",
        expand: lang === "hi" ? "विस्तार करें" : "Expand",
        collapse: lang === "hi" ? "संकुचित करें" : "Collapse",
        edusync: "EduSync"
    };

    const handleNavigate = (path) => {
        navigate(`/student${path}`);
    };

    return (
        <aside className={`sidebar-student${collapsed ? ' collapsed' : ''}`}>

            <div className="sidebar-student-header">
                <div className="logo-sidebar">
                    <LayoutGrid size={24} />
                </div>
                <div className="header-text">
                    <span className="header-title">{labels.dashboard}</span>
                    <span className="header-subtitle">{labels.studentDashboard}</span>
                </div>
            </div>

            <nav className="sidebar-student-nav">
                <ul>

                    {/* ✅ Dashboard */}
                    <li
                        className={activePage === 'dashboard' ? 'active' : ''}
                        onClick={() => handleNavigate("-dashboard")}
                    >
                        <a href="#">
                            <LayoutDashboard size={20} />
                            <span className="label">{labels.dashboard}</span>
                        </a>
                    </li>

                    {/* ✅ Notes */}
                    <li
                        className={activePage === 'notes' ? 'active' : ''}
                        onClick={() => handleNavigate("/notes")}
                    >
                        <a href="#">
                            <StickyNote size={20} />
                            <span className="label">{labels.notes}</span>
                        </a>
                    </li>

                    {/* ✅ JCafe */}
                    <li
                        className={activePage === 'jcafe' ? 'active' : ''}
                        onClick={() => handleNavigate("/jcafe")}
                    >
                        <a href="#">
                            <Coffee size={20} />
                            <span className="label">{labels.jcafe}</span>
                        </a>
                    </li>

                    {/* ✅ Opportunities */}
                    <li
                        className={activePage === 'opportunities' ? 'active' : ''}
                        onClick={() => handleNavigate("/opportunities")}
                    >
                        <a href="#">
                            <Star size={20} />
                            <span className="label">{labels.Opportunities}</span>
                        </a>
                    </li>

                    {/* ✅ Timetable */}
                    <li
                        className={activePage === 'timetable' ? 'active' : ''}
                        onClick={() => handleNavigate("/timetable")}
                    >
                        <a href="#">
                            <CalendarDays size={20} />
                            <span className="label">{labels.timetable}</span>
                        </a>
                    </li>

                    {/* ✅ Attendance */}
                    <li
                        className={activePage === 'attendance' ? 'active' : ''}
                        onClick={() => handleNavigate("/attendance")}
                    >
                        <a href="#">
                            <ClipboardCheck size={20} />
                            <span className="label">{labels.attendance}</span>
                        </a>
                    </li>

                    {/* ✅ ✅ SUPPORT — moved ABOVE notifications */}
                    <li
                        className={activePage === 'support' ? 'active' : ''}
                        onClick={() => handleNavigate("/support")}
                    >
                        <a href="#">
                            <LifeBuoy size={20} />
                            <span className="label">{labels.support}</span>
                        </a>
                    </li>

                    {/* ✅ Notifications */}
                    <li
                        className={activePage === 'notifications' ? 'active' : ''}
                        onClick={() => handleNavigate("/notifications")}
                    >
                        <a href="#">
                            <Bell size={20} />
                            <span className="label">{labels.notifications}</span>
                        </a>
                    </li>

                </ul>
            </nav>




            <div className="sidebar-student-footer">
                <button onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
                    <Menu size={20} />
                    <span className="label">{collapsed ? labels.expand : labels.collapse}</span>
                </button>
            </div>
        </aside>
    );
}