import { useNavigate } from 'react-router-dom';
import './Header.css';
import { Moon, Languages, LogOut, Coffee } from "lucide-react";
import { useSelector } from 'react-redux';

export default function Header({ title, subtitle, altTitle, altSubtitle, lang = "en", onToggleLang }) {
    const navigate = useNavigate();
    const { currentUser } = useSelector((state) => state.user);
    return (
        <header className="dashboard-header">
            <div className="header-title">
                <h1>{lang === "hi" ? (altTitle || title) : title || 'Dashboard'}</h1>
                <p className="header-subtitle-mobile-hide">{lang === "hi" ? (altSubtitle || subtitle) : subtitle || 'Welcome back, Admin User'}</p>
            </div>
            <div className="header-controls">
                <button className="control-btn" onClick={onToggleLang} aria-label={lang === "hi" ? "Switch to English" : "हिन्दी में देखें"}>
                    <Languages size={18} />
                    <span>{lang === "hi" ? "English" : "हिन्दी"}</span>
                </button>
                <button className="control-btn jcafe-btn" onClick={() => navigate('/student/JCafe')} aria-label="Open JCafe">
                    <Coffee size={18} />
                    <span>JCafe</span>
                </button>
                <button className="control-btn logout-btn" onClick={() => navigate("/")}>
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
                <div className="user-avatar" onClick={()=>navigate("/profile")}>
                    {currentUser?.photoURL ? (
                        <img src={currentUser.photoURL} alt={currentUser.username || 'User'} />
                    ) : (
                        <span>{currentUser?.username?.[0]?.toUpperCase() || 'A'}</span>
                    )}
                </div>
            </div>
        </header>
    );
}