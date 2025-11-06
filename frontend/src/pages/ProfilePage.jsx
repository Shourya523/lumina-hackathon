import React from 'react';
import {
    User,
    Shield,
    Bell,
    CreditCard,
    LogOut,
    Mail,
    Phone,
    Eye,
} from 'react-feather';
import { useSelector,useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signOut } from '../Redux/user.redux.js';
import './profilepage.css';

// Using the avatar URL from our previous conversation
const avatarUrl = '../../public/default-avatar.png';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {currentUser} = useSelector(state => state.user);
    const handleSignOut = async() => {
        console.log('Signing out user...');
        try {
            await fetch('http://localhost:8000/api/auth/signout');
            dispatch(signOut());
            // navigate to home after signing out
            navigate('/');
            console.log('User signed out successfully');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    }







    console.log('User from Redux store:', currentUser);
    return (
        <div className="body-profile">
        <div className="settings-page-container">
            <div className="settings-container">
                <div className="sidebar">
                    <div className="sidebar-header">
                        <img src={currentUser.profilePicture || avatarUrl} alt="User Avatar" className="sidebar-avatar" />
                        <div className="sidebar-user-info">
                            <span className="user-name">{currentUser.username || 'Guest User'}</span>
                            <span className="user-email">{currentUser.email || 'guest@example.com'}</span>
                        </div>
                    </div>
                    <nav className="sidebar-nav">
                        <ul>
                            <li>
                                <a href="#" className="active">
                                    <User size={20} />
                                    <span>Profile</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Shield size={20} />
                                    <span>Security</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <Bell size={20} />
                                    <span>Notifications</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <CreditCard size={20} />
                                    <span>Billing</span>
                                </a>
                            </li>
                        </ul>
                    </nav>
                    <div className="sidebar-footer">
                        {/* <a href="#"> */}
                        <span onClick={handleSignOut}>
                            <LogOut size={20} />Logout
                        </span>
                    </div>
                </div>

                <div className="main-content">
                    <h1>Edit Profile</h1>
                    <p className="subtitle">Update your personal information.</p>

                    <div className="profile-pic-section">
                        <img
                            src={currentUser.profilePicture || avatarUrl}
                            alt="Profile Avatar"
                            className="profile-avatar-large"
                        />
                        <div className="profile-pic-actions">
                            <h3>Profile Picture</h3>
                        </div>
                    </div>

                    <form className="profile-form">
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <div className="input-wrapper input-with-icon">
                                <User size={20} className="icon-left" />
                                <input type="text" id="username" defaultValue={currentUser.username} />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <div className="input-wrapper input-with-icon">
                                <Mail size={20} className="icon-left" />
                                <input type="email" id="email" defaultValue={currentUser.email} />
                            </div>
                        </div>
                        <div className="form-actions">
                            <button type="button" className="btn btn-secondary">Cancel</button>
                            <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </div>
    );
};

export default ProfilePage;