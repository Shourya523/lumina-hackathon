import React, { useState } from 'react';
import './AdminDashboard.css';
import './Opportunities.css';
import SideBarAdmin from '../components/Sidebar-admin.jsx';
import Header from '../components/Header.jsx';
import { Briefcase, CheckCircle, XCircle } from 'lucide-react';
import { toast, ToastContainer } from "react-toastify";

const postedOpportunities = [
    { id: 1, title: "Software Engineer Internship", company: "Google", type: "Internship", status: "Active", icon: <CheckCircle size={18} className="icon-active" /> },
    { id: 2, title: "GDSC Team Lead", company: "GDSC JIIT-128", type: "Volunteer", status: "Active", icon: <CheckCircle size={18} className="icon-active" /> },
    { id: 3, title: "Smart India Hackathon", company: "Govt. of India", type: "Hackathon", status: "Closed", icon: <XCircle size={18} className="icon-closed" /> },
    { id: 4, title: "DE Shaw-Code-A-Thon", company: "DE Shaw", type: "Competition", status: "Active", icon: <CheckCircle size={18} className="icon-active" /> },
];

export default function AdminOpportunities() {
    const [lang, setLang] = useState("en");

    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [type, setType] = useState("Internship");
    const [description, setDescription] = useState("");
    const [link, setLink] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title.trim() || !company.trim() || !type.trim()) {
            toast.error("Please fill all fields!");
            return;
        }

        const subject = `New Opportunity: ${title} at ${company} (${type})`;
        const message = description || "No description provided.";

        setLoading(true);

        try {
            const res = await fetch("https://lumina-hackathon.onrender.com/api/sendmail", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    subject,
                    message
                }),
            });

            const data = await res.json();

            if (res.ok) {
                toast.success("Opportunity mail sent successfully!");
            } else {
                toast.error(data.error || "Failed to send opportunity mail!");
            }
        } catch (err) {
            toast.error("Server error while sending opportunity mail!");
        }

        setLoading(false);

        setTitle("");
        setCompany("");
        setType("Internship");
        setDescription("");
        setLink("");
    };

    return (
        <div className="student-dashboard-layout">
            <SideBarAdmin activePage="opportunities" />
            
            <main className="main-content">
                <Header 
                    title="Opportunities"
                    subtitle="Post and manage new opportunities"
                    altTitle="अवसर"
                    altSubtitle="नए अवसर पोस्ट और प्रबंधित करें"
                    lang={lang} 
                    onToggleLang={() => setLang(l => l === "en" ? "hi" : "en")} 
                />

                <div className="content-area">
                    <div className="dashboard-columns">

                        <div className="upcoming-schedule">
                            <h3>Post New Opportunity</h3>
                            
                            <form className="campaign-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="opportunityTitle">Opportunity Title</label>
                                    <input 
                                        type="text" 
                                        id="opportunityTitle" 
                                        placeholder="e.g., Software Engineer Internship"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="opportunityCompany">Company / Organization</label>
                                    <input 
                                        type="text" 
                                        id="opportunityCompany" 
                                        placeholder="e.g., Google, GDSC JIIT-128"
                                        value={company}
                                        onChange={(e) => setCompany(e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="opportunityType">Type</label>
                                    <select 
                                        id="opportunityType"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <option>Internship</option>
                                        <option>Full-Time</option>
                                        <option>Hackathon</option>
                                        <option>Competition</option>
                                        <option>Scholarship</option>
                                        <option>Volunteer</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="opportunityDesc">Description</label>
                                    <textarea 
                                        id="opportunityDesc" 
                                        rows="6" 
                                        placeholder="Write a brief description..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    ></textarea>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="opportunityLink">Application Link</label>
                                    <input 
                                        type="text" 
                                        id="opportunityLink" 
                                        placeholder="https://careers.google.com/..."
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    className="launch-button"
                                    disabled={loading}
                                    style={{ opacity: loading ? 0.6 : 1 }}
                                >
                                    {loading ? "Sending..." : <><Briefcase size={16} /> Post Opportunity</>}
                                </button>
                            </form>
                        </div>

                        <div className="quick-access">
                            <div className="quick-access-card">
                                <h3>Posted Opportunities</h3>
                                
                                <div className="opportunity-list">
                                    {postedOpportunities.map(op => (
                                        <div className="opportunity-item" key={op.id}>
                                            <div className="opportunity-icon">
                                                {op.icon}
                                            </div>
                                            <div className="opportunity-details">
                                                <strong>{op.title}</strong>
                                                <span>
                                                    {op.company} | Type: {op.type}
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
