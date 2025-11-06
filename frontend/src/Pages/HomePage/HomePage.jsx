import TopBar from '../../components/TopBar.jsx'
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { useEffect, useState } from "react";
import {
    ArrowRight,
    CheckCircle,
    BarChart,
    BrainCircuit,
    CalendarDays,
    Users,
    Clock,
    Shield, // Shield is now unused, but I'll leave the import
    Zap,
    XCircle
} from "lucide-react";



export default function HomePage() {
    const navigate = useNavigate();
    const [fade, setFade] = useState(false);
    useEffect(() => {
        const timeout = setTimeout(() => setFade(true), 50);
        return () => clearTimeout(timeout);
    }, []);
    return (
        <>
            {/* Hero Section */}
            <section className="hero">
                <TopBar />
                <div className={`hero-badge fade-up${fade ? ' visible' : ''}`}>The Complete Campus Platform</div>
                <div className={`hero-title fade-up${fade ? ' visible' : ''}`}>
                    Administrative Clarity. <br /> Student Simplicity.
                </div>
                <p className={`hero-subtext fade-up${fade ? ' visible' : ''}`}>
                    EduSync connects your entire campus. We solve the daily grind
                    with a **Smart Canteen** and fix the administrative backlog with an
                    **Intelligent AI Scheduling System**—the "brain" that unifies
                    the entire student experience.
                </p>
                <div className={`hero-actions fade-up${fade ? ' visible' : ''}`}>
                    <button className="btn btn-primary-home" onClick={()=>navigate("/register")}> 
                        Start Free Trial <ArrowRight size={16} />
                    </button>
                    <button className="btn btn-secondary-demo-dashboard" onClick={()=>navigate("/student-dashboard")}>View Demo Dashboard</button>
                </div>
            </section>

            {/* Intelligent Academic Management Section (Now Smart Canteen) */}
            <section className="features-section">
                <div className="features-container">
                    <div className={`features-content fade-up${fade ? ' visible' : ''}`}>
                        <h2>Fixing the Daily Grind</h2>
                        <p>
                            We begin by tackling the most visible daily frustration:
                            the queue. Our **Smart Canteen** module allows students to
                            pre-order and pay directly from their phones, eliminating
                            wait times and streamlining campus life from day one.
                        </p>
                        <ul className="features-list">
                            <li>
                                <CheckCircle size={20} className="feature-icon" />
                                Seamless pre-ordering and mobile payments
                            </li>
                            <li>
                                <CheckCircle size={20} className="feature-icon" />
                                Real-time notifications when orders are ready
                            </li>
                            <li>
                                <CheckCircle size={20} className="feature-icon" />
                                Powered by the same core system as your timetable
                            </li>
                        </ul>
                    </div>
                    <div className={`features-dashboard-home fade-up${fade ? ' visible' : ''}`}>
                        <div className="dashboard-header">
                            <Zap size={18} />
                            <span>Smart Canteen Portal</span>
                        </div>
                        <div className="dashboard-metric">
                            <div className="metric-info">
                                <span>Orders Processed Today</span>
                                <span>1,245</span>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: "78%" }}
                                ></div>
                            </div>
                        </div>
                        <div className="dashboard-metric">
                            <div className="metric-info">
                                <span>Average Wait Time Saved</span>
                                <span>~15min / student</span>
                            </div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: "95%" }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- Powerful Features Grid Section --- */}
            <section className="grid-features-section">
                <div className="grid-features-header fade-up visible">
                    <h2>One Platform, Endless Connections</h2>
                    <p>
                        Our AI scheduling "brain" is the foundation that
                        connects every part of the student and faculty experience.
                    </p>
                </div>
                <div className="features-grid">
                    {/* Card 1 */}
                    <div className={`feature-card fade-up${fade ? ' visible' : ''}`}>
                        <BrainCircuit size={28} className="card-icon" />
                        <h3>Intelligent AI Scheduling</h3>
                        <p>
                            The "brain" that optimizes schedules, faculty, and
                            classrooms, serving as the single source of truth.
                        </p>
                    </div>
                    {/* Card 2 */}
                    <div className={`feature-card fade-up${fade ? ' visible' : ''}`}>
                        <CalendarDays size={28} className="card-icon" />
                        <h3>Unified Dashboard</h3>
                        <p>
                            A single view of your personal schedule, tasks,
                            attendance, and all important campus updates.
                        </p>
                    </div>
                    {/* Card 3 */}
                    <div className={`feature-card fade-up${fade ? ' visible' : ''}`}>
                        <Users size={28} className="card-icon" />
                        <h3>Seamless Attendance</h3>
                        <p>
                            Attendance is tracked seamlessly and integrated
                            directly into your academic profile and dashboard.
                        </p>
                    </div>
                    {/* Card 4 */}
                    <div className={`feature-card fade-up${fade ? ' visible' : ''}`}>
                        <BarChart size={28} className="card-icon" />
                        <h3>Notes Hub</h3>
                        <p>
                            Organizes all your class resources, materials, and
                            notes, directly linked to your personal timetable.
                        </p>
                    </div>
                    {/* Card 5 */}
                    <div className={`feature-card fade-up${fade ? ' visible' : ''}`}>
                        <Clock size={28} className="card-icon" />
                        <h3>Real-Time Notifications</h3>
                        <p>
                            Get updates on everything from class changes to when
                            your canteen order is ready to be picked up.
                        </p>
                    </div>
                    {/* Card 6 */}
                    <div className={`feature-card fade-up${fade ? ' visible' : ''}`}>
                        <Zap size={28} className="card-icon" />
                        <h3>Smart Canteen</h3>
                        <p>
                            The first step to a better day. Pre-order and pay
                            from your phone, eliminating queues entirely.
                        </p>
                    </div>
                </div>
                {/* --- Comparison Section --- */}
                <section className="comparison-section">
                    <h2 className="fade-up visible">From Chaos to Clarity</h2>
                    <div className="comparison-container">
                        {/* Problems Card */}
                        <div className={`comparison-card problems-card fade-up${fade ? ' visible' : ''}`}>
                            <h3>Traditional Campus Chaos</h3>
                            <ul>
                                <li>
                                    <XCircle size={20} className="icon-problem" />
                                    Long canteen queues & wasted time
                                </li>
                                <li>
                                    <XCircle size={20} className="icon-problem" />
                                    Manual scheduling conflicts take weeks
                                </li>
                                <li>
                                    <XCircle size={20} className="icon-problem" />
                                    Disorganized notes and class resources
                                </li>
                                <li>
                                    <XCircle size={20} className="icon-problem" />
                                    Unbalanced faculty workloads
                                </li>
                                <li>
                                    <XCircle size={20} className="icon-problem" />
                                    Students miss important updates
                                </li>
                            </ul>
                        </div>

                        {/* Solutions Card */}
                        <div className={`comparison-card solutions-card fade-up${fade ? ' visible' : ''}`}>
                            <h3>The EduSync Solution</h3>
                            <ul>
                                <li>
                                    <CheckCircle size={20} className="icon-solution" />
                                    Queue-free canteen with mobile pre-ordering
                                </li>
                                <li>
                                    <CheckCircle size={20} className="icon-solution" />
                                    Automated, conflict-free scheduling in minutes
                                </li>
                                <li>
                                    <CheckCircle size={20} className="icon-solution" />
                                    Centralized Notes Hub tied to your schedule
                                </li>
                                <li>
                                    <CheckCircle size={20} className="icon-solution" />
                                    AI-balanced faculty & resource allocation
                                </li>
                                <li>
                                    <CheckCircle size={20} className="icon-solution" />
                                    Instant notifications for classes & canteen
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </section>
            <section className="cta-section">
                <h2 className="fade-up visible">Ready to Unify Your Campus?</h2>
                <p className="fade-up visible">
                    Join progressive campuses using EduSync to solve administrative
                    backlogs and the student's daily chaos.
                </p>
                <div className={`cta-actions fade-up${fade ? ' visible' : ''}`}>
                    <button className="btn btn-cta-primary" onClick={()=>navigate("/register")}>
                        Start Your Free Trial <ArrowRight size={16} />
                    </button>
                    <button className="btn btn-cta-secondary" onClick={()=>navigate("/login")}>
                        Sign In to Dashboard
                    </button>
                </div>
            </section>
        </>
    );
}