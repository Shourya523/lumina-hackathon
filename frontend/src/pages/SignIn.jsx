import React, { useState } from 'react';
import './signin.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { signInStart, signInSuccess, signInFailure } from '../Redux/user.redux.js'
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';

export default function SignIn() {
    const dispatchEvent = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.user);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({});

    const handleForm = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatchEvent(signInStart());
            const res = await fetch('https://lumina-hackathon.onrender.com/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify(formData)
            });

            const data = await res.json();

            if (data.success === false) {
                dispatchEvent(signInFailure(data.message));
                toast.error(data.message || 'Something went wrong');
            } else {
                dispatchEvent(signInSuccess(data));
                toast.success('Sign In successful!');
                setFormData({});
                navigate('/student-dashboard');
            }
        } catch (err) {
            dispatchEvent(signInFailure(err));
            toast.error('Network error');
        }
    };

    return (
        <div className="signin-container-signin-student">
            <ToastContainer position="top-left" />

            <div className="left-pane-signin-student">
                <div className="logo-signin-student"></div>
                <div className="illustration-container-signin-student"></div>
            </div>

            <div className="right-pane-signin-student">
                <div className="form-container-signin-student">
                    <h2 className="welcome-heading-signin-student">Welcome Back!</h2>
                    <p className="welcome-subheading-signin-student">Sign In Page for students.</p>

                    <OAuth />

                    <div className="separator-signin-student">
                        <span>Or</span>
                    </div>

                    <form className="form-signin-student">
                        <div className="form-group-signin-student">
                            <input type="email" id="email" placeholder="Email Address" required onChange={handleForm} />
                            <span className="input-icon-signin-student"><Mail size={18} /></span>
                        </div>

                        <div className="form-group-signin-student">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                placeholder="Password"
                                required
                                onChange={handleForm}
                            />
                            <span className="input-icon-signin-student"><Lock size={18} /></span>

                            <span className="input-icon-right-signin-student" onClick={() => setShowPassword(s => !s)}>
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="submit-btn-signin-student submit-btn-text-signin-student"
                            onClick={handleSubmit}
                        >
                            {loading ? 'Loading...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="footer-link-signin-student">
                        New to EduSync?
                        <span className='signin-page-btn-signin-student' onClick={() => navigate("/signUp")}>
                            Sign Up
                        </span>
                    </p>
                </div>

                <p className="copyright-signin-student">
                    © 2025 All Rights Reserved
                </p>
            </div>
        </div>
    );
}
