import React, { useState } from 'react';
import './signup.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import CustomToast from '../components/CustomToastContainer.jsx'
import OAuth from '../components/OAuth.jsx';
import { Mail, Lock, Eye, EyeOff, Contact } from 'lucide-react';


export default function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({});
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState(null);
    const handleForm = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    console.log(formData);
    const handleSubmit = async (e) => {
        try {
            setLoading(true);
            e.preventDefault();
            const res = await fetch('http://localhost:8000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            console.log(data);
            setLoading(false);

            if (data.success === false) {
                 setError(data.message || 'Something went wrong');
                toast.error(data.message || 'Something went wrong');
            } else {
                toast.success('Sign Up successful!');
                setFormData({});
                navigate('/student-dashboard');
            }
        } catch (err) {
            setLoading(false);
            setError('Network error');
            toast.error('Network error');
            console.error(err);
        }
    }

    return (
        <div className="signup-container">
            <ToastContainer />
            <div className="left-pane">
                <div className="logo">
                </div>
                <div className="illustration-container">
                </div>
            </div>
            <div className="right-pane">
                <div className="form-container">
                    <h2 className="welcome-heading">Welcome</h2>
                    <p className="welcome-subheading">Conversations that create clarity.</p>
                    <OAuth  />

                    <div className="separator">
                        <span>Or</span>
                    </div>

                    <form>
                        <div className="form-group">
                            <input type="text" id="username" placeholder="Username" required onChange={handleForm} />
                            <span className="input-icon"><Contact size={18} /></span>
                        </div>
                        <div className="form-group">
                            <input type="email" id="email" placeholder="Email Address" required onChange={handleForm} />
                            <span className="input-icon"><Mail size={18} /></span>
                        </div>
                        <div className="form-group">
                            <input type={showPassword ? 'text' : 'password'} id="password" placeholder="Password" required onChange={handleForm} />
                            <span className="input-icon"><Lock size={18} /></span>
                            <span className="input-icon-right" onClick={() => setShowPassword(s => !s)}>
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>
                        <button disabled={Loading} type="submit" className="submit-btn submit-btn-text-signup" onClick={handleSubmit}>{Loading ? 'Loading...' : 'Sign Up'}</button>
                    </form>

                    <p className="footer-link">
                        Already on EduSync? <span className='signin-page-btn' onClick={()=>navigate("/signin") }>Sign In</span>
                    </p>
                </div>
                <p className="copyright">&copy; 2025 All Rights Reserved</p>
            </div>
        </div>
    );
}
