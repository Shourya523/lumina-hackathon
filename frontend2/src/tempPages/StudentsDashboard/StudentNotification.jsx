import React, { useState } from 'react';
import './StudentNotification.css'; // This now links to the refactored CSS
import { Megaphone, CheckCircle, Bell, CalendarClock, CalendarX2, Timer } from 'lucide-react';
import SideBarStudent from '../../components/SideBar-student';
import Header from '../../components/Header';
import AIChat from '../../components/AiChat';
const initialStudentNotifications = [
  {
    id: 1,
    type: "upcoming",
    icon: <Timer size={24} className="s-ntf-icon-upcoming" />,
    title: "Upcoming Class Reminder",
    message: 'Your "Computer Networks" class starts in 30 minutes in LT-204.',
    timestamp: "Just now",
    read: false,
    actions: ["View Details"]
  },
  {
    id: 2,
    type: "info",
    icon: <Megaphone size={24} className="s-ntf-icon-info" />,
    title: "IEEE Hackathon Registrations Open",
    message: "Team up and participate in the Annual National IEEE Hackathon. Win exciting prizes!",
    timestamp: "2 hours ago",
    read: false,
    actions: ["Learn More", "Register"]
  },
  {
    id: 3,
    type: "rescheduled",
    icon: <CalendarClock size={24} className="s-ntf-icon-rescheduled" />,
    title: "Class Rescheduled",
    message: 'Your "Database Systems" class has been moved to Thursday 11:30 AM.',
    timestamp: "4 hours ago",
    read: false,
    actions: ["View Timetable", "Acknowledge"]
  },
  {
    id: 4,
    type: "cancelled",
    icon: <CalendarX2 size={24} className="s-ntf-icon-cancelled" />,
    title: "Lab Session Cancelled",
    message: 'Your "Graphics Lab" scheduled today is cancelled due to technical maintenance.',
    timestamp: "6 hours ago",
    read: false,
    actions: ["Acknowledge"]
  },
  {
    id: 5,
    type: "info",
    icon: <Megaphone size={24} className="s-ntf-icon-info" />,
    title: "Library Due Reminder",
    message: "You have 2 books that are due for return tomorrow. Avoid late fee charges.",
    timestamp: "1 day ago",
    read: true,
    actions: ["View Details"]
  },
  {
    id: 6,
    type: "upcoming",
    icon: <Timer size={24} className="s-ntf-icon-upcoming" />,
    title: "Exam Schedule Released",
    message: "Final semester exam timetable is now available on the student portal.",
    timestamp: "1 day ago",
    read: true,
    actions: ["View Details"]
  },
  {
    id: 7,
    type: "info",
    icon: <Megaphone size={24} className="s-ntf-icon-info" />,
    title: "Placement Assistance Workshop",
    message: "A resume & interview training workshop will be conducted this Friday in Auditorium.",
    timestamp: "2 days ago",
    read: false,
    actions: ["Register"]
  },
  {
    id: 8,
    type: "upcoming",
    icon: <Timer size={24} className="s-ntf-icon-upcoming" />,
    title: "Sports Meet Selections",
    message: "Basketball & Athletics team tryouts are scheduled for Saturday.",
    timestamp: "3 days ago",
    read: true,
    actions: ["View Details"]
  },
  {
    id: 9,
    type: "info",
    icon: <Megaphone size={24} className="s-ntf-icon-info" />,
    title: "Hostel Mess Menu Update",
    message: "New weekly mess menu has been released and will be effective starting Monday.",
    timestamp: "3 days ago",
    read: false,
    actions: ["Learn More"]
  },
  {
    id: 10,
    type: "cancelled",
    icon: <CalendarX2 size={24} className="s-ntf-icon-cancelled" />,
    title: "Guest Lecture Cancelled",
    message: "The guest lecture on Quantum Computing has been postponed.",
    timestamp: "4 days ago",
    read: true,
    actions: ["Acknowledge"]
  }
];

const hiText = {
    inbox: "इनबॉक्स",
    unread: "अपठित",
    all: "सभी",
    empty: "सभी सूचनाएँ पढ़ ली गई हैं!",
    // Titles
    classRescheduled: "कक्षा पुनर्निर्धारित",
    classCancelled: "कक्षा रद्द",
    upcomingReminder: "आगामी कक्षा अनुस्मारक",
    campusAnnouncement: "परिसर घोषणा",
    // Messages
    rescheduledMsg: 'आपकी "डेटा संरचना" कक्षा जो सोमवार सुबह 10:00 बजे निर्धारित थी, अब मंगलवार दोपहर 02:00 बजे कमरा LT-101 में होगी।',
    cancelledMsg: 'शिक्षक की अनुपलब्धता के कारण कल के लिए आपकी "इंजीनियरिंग गणित-I" कक्षा रद्द कर दी गई है।',
    upcomingMsg1: 'आपकी "एल्गोरिदम" कक्षा आज सुबह 09:59 बजे कमरा LT-205 में है।',
    upcomingMsg2: 'आपकी "ऑपरेटिंग सिस्टम लैब" 2 घंटे में CS-Lab-3 में शुरू होगी।',
    announcementMsg: "वार्षिक टेक फेस्ट 'इनोवेट 2025' के लिए पंजीकरण अब खुल गए हैं। इसे न चूकें!",
    upcomingMsg3: 'आपकी "डेटाबेस मैनेजमेंट" कक्षा कल सुबह 09:00 बजे है।',
    // Actions
    viewTimetable: "समय सारणी देखें",
    acknowledge: "स्वीकार करें",
    viewDetails: "विवरण देखें",
    learnMore: "और जानें",
    markRead: "पढ़ा हुआ चिह्नित करें"
};

const NotificationCard = ({ notification, onMarkRead, lang }) => {
    const { id, type, icon, title, message, timestamp, read, actions } = notification;
    const hiMap = {
        'Class Rescheduled': hiText.classRescheduled,
        'Your "Data Structures" class scheduled for Monday 10:00 AM has been moved to Tuesday, 02:00 PM in Room LT-101.': hiText.rescheduledMsg,
        'Class Cancelled': hiText.classCancelled,
        'Your "Engineering Mathematics-I" class for tomorrow has been cancelled due to teacher unavailability.': hiText.cancelledMsg,
        'Upcoming Class Reminder': hiText.upcomingReminder,
        'Your "Algorithms" class is today at 09:59 AM in Room LT-205.': hiText.upcomingMsg1,
        'Your "Operating Systems Lab" starts in 2 hours in CS-Lab-3.': hiText.upcomingMsg2,
        'Campus Announcement': hiText.campusAnnouncement,
        "The annual tech fest 'Innovate 2025' registrations are now open. Don't miss out!": hiText.announcementMsg,
        'Your "Database Management" class is tomorrow at 09:00 AM.': hiText.upcomingMsg3,
    };
    const hiActions = {
        'View Timetable': hiText.viewTimetable,
        'Acknowledge': hiText.acknowledge,
        'View Details': hiText.viewDetails,
        'Learn More': hiText.learnMore,
        'Mark as Read': hiText.markRead
    };

    return (
        <div className={`s-ntf-card ${type} ${read ? 'read' : ''}`}>
            <div className="s-ntf-card-icon">
                {icon}
            </div>
            <div className="s-ntf-card-content">
                <div className="s-ntf-content-header">
                    <h3>{lang === "hi" ? (hiMap[title] || title) : title}</h3>
                    <span className="s-ntf-timestamp">{timestamp}</span>
                </div>
                <p className="s-ntf-message">{lang === "hi" ? (hiMap[message] || message) : message}</p>
                <div className="s-ntf-card-actions">
                    {actions.map(action => (
                        <button key={action} className={`s-ntf-action-btn ${action.toLowerCase().replace(' ', '-')}`}>
                            {lang === "hi" ? (hiActions[action] || action) : action}
                        </button>
                    ))}
                    {!read && <button className="s-ntf-action-btn mark-read" onClick={() => onMarkRead(id)}>
                        {lang === "hi" ? hiText.markRead : "Mark as Read"}
                    </button>}
                </div>
            </div>
        </div>
    );
};


export default function StudentNotifications() {
    const [notifications, setNotifications] = useState(initialStudentNotifications);
    const [filter, setFilter] = useState('unread');
    const [showChat, setShowChat] = useState(false);
    const [lang, setLang] = useState("en");

    const altTitle = "छात्र सूचना केंद्र";
    const altSubtitle = "आपकी कक्षाओं, आयोजनों और घोषणाओं पर अपडेट";
    
    const handleMarkRead = (id) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'unread') return !n.read;
        return true;
    });

    return (
        <div className="page-layout">
            <SideBarStudent activePage={"notifications"} />
            <main className="main-content">
                <Header
                    title="Student Notification Center"
                    subtitle="Updates on your classes, events, and announcements"
                    altTitle={altTitle}
                    altSubtitle={altSubtitle}
                    lang={lang}
                    onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")}
                />
                <div className="s-ntf-page">
                    <div className="s-ntf-container">
                        <div className="s-ntf-header">
                            <h2><Bell size={22} /> {lang === "hi" ? hiText.inbox : "Inbox"}</h2>
                            <div className="s-ntf-filter-tabs">
                                <button
                                    className={`s-ntf-filter-btn ${filter === 'unread' ? 'active' : ''}`}
                                    onClick={() => setFilter('unread')}
                                >
                                    {lang === "hi" ? hiText.unread : "Unread"} ({notifications.filter(n => !n.read).length})
                                </button>
                                <button
                                    className={`s-ntf-filter-btn ${filter === 'all' ? 'active' : ''}`}
                                    onClick={() => setFilter('all')}
                                >
                                    {lang === "hi" ? hiText.all : "All"}
                                </button>
                            </div>
                        </div>

                        <div className="s-ntf-list">
                            {filteredNotifications.length > 0 ? (
                                filteredNotifications.map(notification => (
                                    <NotificationCard
                                        key={notification.id}
                                        notification={notification}
                                        onMarkRead={handleMarkRead}
                                        lang={lang}
                                    />
                                ))
                            ) : (
                                <div className="s-ntf-empty-state">
                                    <CheckCircle size={48} />
                                    <p>{lang === "hi" ? hiText.empty : "All caught up! No unread notifications."}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}