import React, { useState } from "react";
import "./StudentOpportunities.css";
import SideBarStudent from "../../components/SideBar-student";
import Header from "../../components/Header";
import { Briefcase, GraduationCap, Users, Rocket } from "lucide-react";

const mockOpportunities = [
  {
    id: 1,
    type: "hackathon",
    icon: <Rocket size={24} className="opp-icon-hackathon" />,
    title: "IEEE National Hackathon",
    message:
      "IEEE is organizing a national-level hackathon. Teams of 3–4 can apply. Exciting prizes + certificates will be awarded.",
    timestamp: "2 hours ago",
    actions: ["View Details", "Apply Now"],
  },
  {
    id: 2,
    type: "research",
    icon: <GraduationCap size={24} className="opp-icon-research" />,
    title: "AI Research Fellowship",
    message:
      "Prof. Sharma is seeking dedicated students to assist in machine learning & NLP research. Stipend may be available.",
    timestamp: "5 hours ago",
    actions: ["Contact Professor", "Learn More"],
  },
  {
    id: 3,
    type: "assistant",
    icon: <Users size={24} className="opp-icon-assistant" />,
    title: "Teaching Assistant - OS Lab",
    message:
      "Prof. Mehta needs a TA for guidance sessions in Operating Systems. Approx. 6 hours/week.",
    timestamp: "1 day ago",
    actions: ["Apply", "Send Resume"],
  },
  {
    id: 4,
    type: "internship",
    icon: <Briefcase size={24} className="opp-icon-internship" />,
    title: "Infosys Alumni Internship",
    message:
      "A college alumni currently working at Infosys is offering 2 internship slots for passionate students.",
    timestamp: "1 day ago",
    actions: ["View Details", "Connect"],
  },
  {
    id: 5,
    type: "hackathon",
    icon: <Rocket size={24} className="opp-icon-hackathon" />,
    title: "Google Developer Student Club Hackathon",
    message:
      "GDSC is hosting a 36-hour offline hackathon on campus. Free swag, mentorship, food & surprise rewards!",
    timestamp: "3 days ago",
    actions: ["Register", "Event Website"],
  },
  {
    id: 6,
    type: "research",
    icon: <GraduationCap size={24} className="opp-icon-research" />,
    title: "Computer Vision Lab Fellowship",
    message:
      "The CV Lab is recruiting students skilled in Python & OpenCV for autonomous navigation research.",
    timestamp: "4 days ago",
    actions: ["Apply", "Read Requirements"],
  },
  {
    id: 7,
    type: "internship",
    icon: <Briefcase size={24} className="opp-icon-internship" />,
    title: "TCS Remote Internship",
    message:
      "TCS is offering virtual internships for first and second-year students. No prior experience required.",
    timestamp: "5 days ago",
    actions: ["Company Portal", "Prepare Resume"],
  },
  {
    id: 8,
    type: "assistant",
    icon: <Users size={24} className="opp-icon-assistant" />,
    title: "Department Lab Assistant",
    message:
      "CS department is hiring 3 students to assist in Lab equipment handling & student support.",
    timestamp: "6 days ago",
    actions: ["Apply", "Instructions"],
  },
  {
    id: 9,
    type: "club",
    icon: <Users size={24} className="opp-icon-assistant" />,
    title: "Cybersecurity Club Recruitment",
    message:
      "The Cyber Warriors club is recruiting new members for CTF competitions & training sessions.",
    timestamp: "1 week ago",
    actions: ["Join Discord", "Apply"],
  },
  {
    id: 10,
    type: "startup",
    icon: <Rocket size={24} className="opp-icon-hackathon" />,
    title: "Startup Collaboration Opportunity",
    message:
      "A campus startup is looking for students skilled in UI/UX and React for product development.",
    timestamp: "1 week ago",
    actions: ["Contact Founder", "Portfolio Required"],
  },
  {
    id: 11,
    type: "volunteer",
    icon: <Users size={24} className="opp-icon-assistant" />,
    title: "TechFest Core Team Volunteer",
    message:
      "Registrations open to join the TechFest organizing committee. Gain hands-on leadership & event experience.",
    timestamp: "1 week ago",
    actions: ["Apply", "Team Roles"],
  },
  {
    id: 12,
    type: "opensource",
    icon: <GraduationCap size={24} className="opp-icon-research" />,
    title: "Open Source Contribution Drive",
    message:
      "Mentors are helping students contribute to real open-source GitHub projects. Beginners welcome.",
    timestamp: "2 weeks ago",
    actions: ["Get Started", "GitHub Guide"],
  },
];


export default function StudentOpportunities() {
  const [opportunities] = useState(mockOpportunities);
  const [lang, setLang] = useState("en");

  return (
    <div className="page-layout">
      <SideBarStudent activePage={"opportunities"} />
      <main className="main-content">
        <Header
          title="Student Opportunities"
          subtitle="Hackathons, Internships, Research & More"
          altTitle="छात्र अवसर"
          altSubtitle="हैकाथॉन, इंटर्नशिप और अनुसंधान कार्यक्रम"
          lang={lang}
          onToggleLang={() => setLang((l) => (l === "en" ? "hi" : "en"))}
        />

        <div className="opp-page">
          <div className="opp-container">
            <h2 className="opp-heading">
              Available Opportunities for Students
            </h2>

            <div className="opp-list">
              {opportunities.map((opp) => (
                <div key={opp.id} className={`opp-card ${opp.type}`}>
                  <div className="opp-card-icon">{opp.icon}</div>

                  <div className="opp-card-content">
                    <div className="opp-content-header">
                      <h3>{opp.title}</h3>
                      <span className="opp-timestamp">{opp.timestamp}</span>
                    </div>

                    <p className="opp-message">{opp.message}</p>

                    <div className="opp-card-actions">
                      {opp.actions.map((a, index) => (
                        <button key={index} className="opp-action-btn">
                          {a}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
