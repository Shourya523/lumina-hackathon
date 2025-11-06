import React, { useState } from 'react';
import './signin.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import CustomToast from '../components/CustomToastContainer.jsx'
import { signInStart, signInSuccess, signInFailure } from '../Redux/user.redux.js'
import { useDispatch, useSelector } from 'react-redux';
import OAuth from '../components/OAuth.jsx';
import { Mail, Lock, Eye, EyeOff, Contact } from 'lucide-react';

export default function SignIn() {
    const dispatchEvent = useDispatch();
    const navigate = useNavigate();
    const { loading } = useSelector((state) => state.user);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({});

    const handleForm = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    console.log(formData);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);
        try {
            dispatchEvent(signInStart());
            const res = await fetch('http://localhost:8000/api/auth/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            console.log(data);

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
        <div className="signup-container-signin">
            <ToastContainer position="top-left" />
            <div className="left-pane-signin">
                <div className="logo-signin">
                </div>
                <div className="illustration-container-signin">
                </div>
            </div>
            <div className="right-pane-signin">
                <div className="form-container-signin">
                    <h2 className="welcome-heading-signin">Welcome Back!</h2>
                    <p className="welcome-subheading-signin">Conversations that create clarity.</p>
                    <OAuth  />

                    <div className="separator-signin">
                        <span>Or</span>
                    </div>

                    <form>
                        <div className="form-group-signin">
                            <input type="email" id="email" placeholder="Email Address" required onChange={handleForm} />
                            <span className="input-icon-signin"><Mail size={18} /></span>
                        </div>
                        <div className="form-group-signin">
                            <input type={showPassword ? 'text' : 'password'} id="password" placeholder="Password" required onChange={handleForm} />
                            <span className="input-icon-signin"><Lock size={18} /></span>
                            <span className="input-icon-right-signin" onClick={() => setShowPassword(s => !s)}>
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>
                        <button disabled={loading} type="submit" className="submit-btn-signin submit-btn-text-signin" onClick={handleSubmit}>{loading ? 'Loading...' : 'Sign In'}</button>
                    </form>

                    <p className="footer-link-signin">
                        New to EduSync? <span className='signin-page-btn-signin' onClick={() => navigate("/signUp")}>Sign Up</span>
                    </p>
                </div>
                <p className="copyright-signin">&copy; 2025 All Rights Reserved</p>
            </div>
        </div>
    );
}
