import React, { useState } from 'react';
import './AdminDashboard.css';
import SideBarAdmin from '../components/Sidebar-admin.jsx';
import Header from '../components/Header.jsx';
import StatCard from '../components/StatCard.jsx';
import {
    Inbox,
    Megaphone,
    Star,
    Users,
    Send,
    UserPlus,
    FileText
} from 'lucide-react';

const mockMails = [
    { id: 1, sender: 'Ruchika Bala', subject: 'Query about Data Structures...', time: '10m ago', initial: 'R', color: '#E5484D' },
    { id: 2, sender: 'Student Support', subject: 'Request: Password Reset for 12345', time: '45m ago', initial: 'S', color: '#3b82f6' },
    { id: 3, sender: 'Himika Verma', subject: 'Lab-C1 maintenance schedule', time: '2h ago', initial: 'H', color: '#16a34a' },
];

export default function AdminDashboard() {
    const [lang, setLang] = useState("en");

    return (
        <div className="student-dashboard-layout">
            <SideBarAdmin activePage={"dashboard"} />
            <main className="main-content">
                <Header 
                    title="Admin Dashboard" 
                    subtitle="Welcome back, Admin" 
                    altTitle="एडमिन डैशबोर्ड" 
                    altSubtitle="वापसी पर स्वागत है, एडमिन"
                    lang={lang} 
                    onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")} 
                />

                <div className="content-area">
                    <div className="stats-grid">
                        <StatCard 
                            icon={<Inbox size={20} />} 
                            title="Incoming Mails" 
                            value="125" 
                            description="+5 new today"
                            progressPercent={30}
                        />
                        <StatCard 
                            icon={<Megaphone size={20} />} 
                            title="Active Campaigns" 
                            value="14" 
                            description="2 launched this week"
                            progressPercent={70}
                        />
                        <StatCard 
                            icon={<Star size={20} />} 
                            title="New Opportunities" 
                            value="8" 
                            description="3 awaiting approval"
                            progressPercent={15}
                        />
                        <StatCard 
                            icon={<Users size={20} />} 
                            title="New Signups" 
                            value="82" 
                            description="+15% this week"
                        />
                    </div>

                    <div className="dashboard-columns">
                        <div className="upcoming-schedule">
                            <h3>Create New Campaign</h3>
                            <form className="campaign-form">
                                <div className="form-group">
                                    <label htmlFor="campaignSubject">Subject</label>
                                    <input type="text" id="campaignSubject" placeholder="e.g., Weekly Newsletter, New Event" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="campaignAudience">Audience</label>
                                    <select id="campaignAudience">
                                        <option>All Students</option>
                                        <option>Faculty</option>
                                        <option>Alumni</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="campaignContent">Content</label>
                                    <textarea id="campaignContent" rows="5" placeholder="Write your message..."></textarea>
                                </div>
                                <button type="submit" className="launch-button">
                                    <Send size={16} /> Launch Campaign
                                </button>
                            </form>
                        </div>

                        <div className="quick-access">
                            <div className="quick-access-card">
                                <h3>Incoming Mails</h3>
                                <div className="schedule-list">
                                    {mockMails.map(mail => (
                                        <div key={mail.id} className="class-card">
                                            <div className="class-card-details">
                                                <div className="mail-avatar" style={{backgroundColor: mail.color}}>
                                                    {mail.initial}
                                                </div>
                                                <div className="class-card-subject">
                                                    {mail.sender}
                                                    <span>{mail.subject}</span>
                                                </div>
                                            </div>
                                            <div className="mail-time">
                                                {mail.time}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="quick-access-card">
                                <h3>Quick Access</h3>
                                <div className="quick-links-grid">
                                    <a href="#" className="quick-link">
                                        <UserPlus size={18} /> Add New User
                                    </a>
                                    <a href="#" className="quick-link">
                                        <FileText size={18} /> View Reports
                                    </a>
                                    <a href="#" className="quick-link">
                                        <Megaphone size={18} /> Manage Campaigns
                                    </a>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
