import React, { useState } from 'react';
import './AdminDashboard.css';
import './Campaigns.css';
import SideBarAdmin from '../components/Sidebar-admin.jsx';
import Header from '../components/Header.jsx';
import { Send, Clock, CheckCircle } from 'lucide-react';
import { toast,ToastContainer } from "react-toastify";

const pastCampaigns = [
    { id: 1, subject: "Weekly Newsletter - Nov 1", status: "Sent", recipients: 1250, statusIcon: <CheckCircle size={18} className="icon-sent" /> },
    { id: 2, subject: "TechFest 2025 Announcement", status: "Sent", recipients: 1580, statusIcon: <CheckCircle size={18} className="icon-sent" /> },
    { id: 3, subject: "Mid-Term Exam Schedule", status: "Draft", recipients: 0, statusIcon: <Clock size={18} className="icon-draft" /> },
    { id: 4, subject: "Holiday: Diwali Break", status: "Sent", recipients: 1580, statusIcon: <CheckCircle size={18} className="icon-sent" /> },
];

export default function Campaigns() {
    const [lang, setLang] = useState("en");

    const [subject, setSubject] = useState("");
    const [audience, setAudience] = useState("All Students");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!subject.trim() || !content.trim()) {
            toast.error("Please fill all fields!");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("https://lumina-hackathon.onrender.com/api/sendmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    subject,
                    message: content
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Campaign mail sent successfully!");
            } else {
                toast.error(data.error || "Failed to send campaign mail!");
            }
        } catch (err) {
            toast.error("Server error while sending campaign!");
        }

        setLoading(false);
        setSubject("");
        setContent("");
        setAudience("All Students");
    };

    return (
        <div className="student-dashboard-layout">
            <SideBarAdmin activePage="campaigns" />
            
            <main className="main-content">
                <Header 
                    title="Campaigns"
                    subtitle="Create and manage all communications"
                    altTitle="अभियान"
                    altSubtitle="सभी संचार बनाएं और प्रबंधित करें"
                    lang={lang} 
                    onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")} 
                />

                <div className="content-area">
                    <div className="dashboard-columns">

                        {/* LEFT: Create Campaign */}
                        <div className="upcoming-schedule">
                            <h3>Create New Campaign</h3>

                            <form className="campaign-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="campaignSubject">Subject</label>
                                    <input 
                                        type="text" 
                                        id="campaignSubject" 
                                        placeholder="e.g., Weekly Newsletter, New Event"
                                        value={subject}
                                        onChange={(e) => setSubject(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="campaignAudience">Audience</label>
                                    <select 
                                        id="campaignAudience"
                                        value={audience}
                                        onChange={(e) => setAudience(e.target.value)}
                                    >
                                        <option>All Students</option>
                                        <option>Faculty</option>
                                        <option>Alumni</option>
                                        <option>GDSC Members</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="campaignContent">Content</label>
                                    <textarea 
                                        id="campaignContent" 
                                        rows="8" 
                                        placeholder="Write your message..."
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                    ></textarea>
                                </div>

                                <button 
                                    type="submit" 
                                    className="launch-button"
                                    disabled={loading}
                                    style={{ opacity: loading ? 0.6 : 1 }}
                                >
                                    {loading ? "Sending..." : <><Send size={16} /> Launch Campaign</>}
                                </button>
                            </form>
                        </div>

                        {/* RIGHT: Past Campaigns */}
                        <div className="quick-access">
                            <div className="quick-access-card">
                                <h3>Past Campaigns</h3>
                                <div className="campaign-list">
                                    {pastCampaigns.map(campaign => (
                                        <div className="campaign-item" key={campaign.id}>
                                            <div className="campaign-icon">
                                                {campaign.statusIcon}
                                            </div>
                                            <div className="campaign-details">
                                                <strong>{campaign.subject}</strong>
                                                <span>
                                                    Status: {campaign.status}
                                                    {campaign.status === 'Sent' && ` | Recipients: ${campaign.recipients}`}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </main>
            <ToastContainer position="top-right" autoClose={2000} />
        </div>
    );
}
