import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './SideBar-admin.css'; // Use the new CSS file
import {
    LayoutGrid,
    LayoutDashboard,
    Inbox,
    Megaphone,
    Star,
    Users,
    Settings,
    Menu,
} from "lucide-react";

export default function SideBarAdmin({ activePage = "" }) {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [lang] = useState("en"); // Hardcoded to 'en' for now

    activePage = activePage.toLowerCase();

    const labels = {
        dashboard: "Dashboard",
        mails: "Mails",
        campaigns: "Campaigns",
        opportunities: "Opportunities",
        users: "Users",
        settings: "Settings",
        adminPanel: "Admin Panel",
        admin: "Admin",
        expand: "Expand",
        collapse: "Collapse",
    };

    // Updated to navigate to /admin routes
    const handleNavigate = (path) => {
        navigate(`/admin${path}`);
    };

    return (
        <aside className={`sidebar-admin${collapsed ? ' collapsed' : ''}`}>
            
            <div className="sidebar-admin-header">
                <div className="logo-sidebar">
                    <LayoutGrid size={24} />
                </div>
                <div className="header-text">
                    <span className="header-title">{labels.adminPanel}</span>
                    <span className="header-subtitle">{labels.admin}</span>
                </div>
            </div>

            <nav className="sidebar-admin-nav">
                {/* --- Main Navigation List --- */}
                <ul>
                    <li className={activePage === 'dashboard' ? 'active' : ''} onClick={() => handleNavigate("-dashboard")}>
                        <a href="#">
                            <LayoutDashboard size={20} />
                            <span className="label">{labels.dashboard}</span>
                        </a>
                    </li>

                    <li className={activePage === 'campaigns' ? 'active' : ''} onClick={() => handleNavigate("/campaigns")}>
                        <a href="#">
                            <Megaphone size={20} />
                            <span className="label">{labels.campaigns}</span>
                        </a>
                    </li>

                     <li className={activePage === 'opportunities' ? 'active' : ''} onClick={() => handleNavigate("/opportunities")}>
                        <a href="#">
                            <Star size={20} />
                            <span className="label">{labels.opportunities}</span>
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="sidebar-admin-footer">
                <button onClick={() => setCollapsed(!collapsed)} aria-label="Toggle sidebar">
                    <Menu size={20} />
                    <span className="label">{collapsed ? labels.expand : labels.collapse}</span>
                </button>
            </div>
        </aside>
    );
}