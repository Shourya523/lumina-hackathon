import React, { useState } from "react";
import "./admin-signup.css";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Contact } from "lucide-react";

export default function AdminSignup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    });

    const ADMIN_EMAIL = "admin@edusync.com";
    const ADMIN_PASSWORD = "Admin123";

    const handleForm = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.email !== ADMIN_EMAIL || formData.password !== ADMIN_PASSWORD) {
            toast.error("Invalid admin credentials");
            return;
        }

        toast.success("Admin Sign Up Successful!");
        navigate("/admin-dashboard");
    };

    return (
        <div className="admin-signup-container-admin-signup">
            <ToastContainer position="top-center" />

            <div className="center-pane-admin-signup">
                <div className="form-container-admin-signup">
                    <h2 className="welcome-heading-admin-signup">Admin Access</h2>
                    <p className="welcome-subheading-admin-signup">
                        EduSync Admin Sign Up Panel
                    </p>

                    <form className="form-admin-signup">
                        <div className="form-group-admin-signup">
                            <input
                                type="text"
                                id="username"
                                placeholder="Admin Name"
                                required
                                onChange={handleForm}
                            />
                            <span className="input-icon-admin-signup">
                                <Contact size={18} />
                            </span>
                        </div>

                        <div className="form-group-admin-signup">
                            <input
                                type="email"
                                id="email"
                                placeholder="Admin Email"
                                required
                                onChange={handleForm}
                            />
                            <span className="input-icon-admin-signup">
                                <Mail size={18} />
                            </span>
                        </div>

                        <div className="form-group-admin-signup">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Admin Password"
                                required
                                onChange={handleForm}
                            />
                            <span className="input-icon-admin-signup">
                                <Lock size={18} />
                            </span>

                            <span
                                className="input-icon-right-admin-signup"
                                onClick={() => setShowPassword((s) => !s)}
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="submit-btn-admin-signup submit-btn-text-admin-signup"
                            onClick={handleSubmit}
                        >
                            Sign Up
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
