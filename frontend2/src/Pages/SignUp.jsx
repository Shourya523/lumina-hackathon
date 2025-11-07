import React, { useState } from 'react';
import './signup.css';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import OAuth from '../components/OAuth.jsx';
import { Mail, Lock, Eye, EyeOff, Contact } from 'lucide-react';

export default function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({});
    const [Loading, setLoading] = useState(false);
    const [Error, setError] = useState(null);

    const handleForm = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch("https://lumina-hackathon.onrender.com/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            setLoading(false);

            if (data.success === false) {
                setError(data.message || "Something went wrong");
                toast.error(data.message || "Something went wrong");
            } else {
                toast.success("Sign Up successful!");
                setFormData({});
                navigate('/student-dashboard');
            }
        } catch (err) {
            setLoading(false);
            setError("Network error");
            toast.error("Network error");
        }
    };

    return (
        <div className="signup-container-signup-student">
            <ToastContainer />
            <div className="left-pane-signup-student">
                <div className="logo-signup-student"></div>
                <div className="illustration-container-signup-student"></div>
            </div>

            <div className="right-pane-signup-student">
                <div className="form-container-signup-student">
                    <h2 className="welcome-heading-signup-student">Welcome</h2>
                    <p className="welcome-subheading-signup-student">Student Sign Up Form</p>

                    <OAuth />

                    <div className="separator-signup-student">
                        <span>Or</span>
                    </div>

                    <form className="form-signup-student">
                        <div className="form-group-signup-student">
                            <input
                                type="text"
                                id="username"
                                placeholder="Username"
                                required
                                onChange={handleForm}
                            />
                            <span className="input-icon-signup-student"><Contact size={18} /></span>
                        </div>

                        <div className="form-group-signup-student">
                            <input
                                type="email"
                                id="email"
                                placeholder="Email Address"
                                required
                                onChange={handleForm}
                            />
                            <span className="input-icon-signup-student"><Mail size={18} /></span>
                        </div>

                        <div className="form-group-signup-student">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Password"
                                required
                                onChange={handleForm}
                            />
                            <span className="input-icon-signup-student"><Lock size={18} /></span>
                            <span
                                className="input-icon-right-signup-student"
                                onClick={() => setShowPassword((s) => !s)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>

                        <button
                            disabled={Loading}
                            type="submit"
                            className="submit-btn-signup-student submit-btn-text-signup-student"
                            onClick={handleSubmit}
                        >
                            {Loading ? "Loading..." : "Sign Up"}
                        </button>
                    </form>

                    <p className="footer-link-signup-student">
                        Already on EduSync?
                        <span className="signin-page-btn-signup-student" onClick={() => navigate("/signin")}>
                            Sign In
                        </span>
                    </p>
                </div>

                <p className="copyright-signup-student">
                    © 2025 All Rights Reserved
                </p>
            </div>
        </div>
    );
}
