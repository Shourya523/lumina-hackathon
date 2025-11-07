import React, { useState } from "react";
import "./StudentSupport.css";
import SideBarStudent from "../../components/SideBar-student";
import Header from "../../components/Header";
import { MessageSquare, CheckCircle, Clock, Send } from "lucide-react";
import { ToastContainer, toast } from "react-toastify";


const initialComplaints = [
  {
    id: 1,
    title: "WiFi Not Working in Hostel Block B",
    description: "Internet connectivity is unstable for the past 2 days.",
    status: "in-progress",
    timestamp: "3 hours ago",
    resolution: ""
  },
  {
    id: 2,
    title: "Projector Not Working in LT-105",
    description: "Lecture was interrupted multiple times due to projector issues.",
    status: "pending",
    timestamp: "6 hours ago",
    resolution: ""
  },
  {
    id: 3,
    title: "Library AC Not Cooling",
    description: "The reading hall is getting too warm.",
    status: "resolved",
    timestamp: "2 days ago",
    resolution: "AC filter cleaned and gas refilled."
  },
  {
    id: 4,
    title: "Water Cooler Leakage",
    description: "Ground floor corridor water cooler is leaking constantly.",
    status: "pending",
    timestamp: "1 day ago",
    resolution: ""
  },
  {
    id: 5,
    title: "Canteen Food Quality Decreased",
    description: "Food seems stale and oily this week. Hygiene needs improvement.",
    status: "in-progress",
    timestamp: "12 hours ago",
    resolution: ""
  },
  {
    id: 6,
    title: "Broken Chair in Classroom",
    description: "One chair in LT-204 is broken and unsafe to sit on.",
    status: "resolved",
    timestamp: "5 days ago",
    resolution: "Chair removed and replaced with a new one."
  }
];


export default function Support() {
  const [complaints, setComplaints] = useState(initialComplaints);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(false);
  const [newComplaint, setNewComplaint] = useState({
    title: "",
    description: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!newComplaint.title.trim() || !newComplaint.description.trim()) {
      toast.error("Please fill all fields!");
      return;
    }

    setLoading(true);

    const newEntry = {
      id: complaints.length + 1,
      title: newComplaint.title,
      description: newComplaint.description,
      status: "pending",
      timestamp: "Just now",
      resolution: ""
    };

    setComplaints([newEntry, ...complaints]);

    try {
      const res = await fetch("http://localhost:8000/api/sendmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          subject: newComplaint.title,
          message: newComplaint.description,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Mail sent successfully!");
        setComplaints((prev) =>
          prev.map((c) =>
            c.id === newEntry.id ? { ...c, status: "sent" } : c
          )
        );
      } else {
        toast.error(data.error || "Failed to send mail!");
        setComplaints((prev) =>
          prev.map((c) =>
            c.id === newEntry.id ? { ...c, status: "not-sent" } : c
          )
        );
      }
    } catch (err) {
      toast.error("Server error! Could not send mail.");
      setComplaints((prev) =>
        prev.map((c) =>
          c.id === newEntry.id ? { ...c, status: "not-sent" } : c
        )
      );
    }

    setLoading(false);
    setNewComplaint({ title: "", description: "" });
  };



  const filteredList =
    filter === "all"
      ? complaints
      : complaints.filter((c) => c.status === filter);

  return (
    <div className="page-layout">
      <SideBarStudent activePage={"support"} />
      <main className="main-content">
        <Header
          title="Support & Help Desk"
          subtitle="Raise issues and track complaint status"
        />
        <ToastContainer position="top-right" autoClose={2000} />

        <div className="support-page">

          <div className="support-form-container">
            <h3>Raise a Complaint</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Issue Title"
                value={newComplaint.title}
                onChange={(e) =>
                  setNewComplaint({ ...newComplaint, title: e.target.value })
                }
              />
              <textarea
                placeholder="Describe the issue..."
                value={newComplaint.description}
                onChange={(e) =>
                  setNewComplaint({
                    ...newComplaint,
                    description: e.target.value,
                  })
                }
              ></textarea>
              <button
                className="support-submit-btn"
                type="submit"
                disabled={loading}
                style={{ opacity: loading ? 0.6 : 1, cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "Sending..." : <><Send size={18} /> Submit</>}
              </button>

            </form>
          </div>

          {/* Filter Tabs */}
          <div className="support-filter-tabs">
            <button
              className={filter === "all" ? "active" : ""}
              onClick={() => setFilter("all")}
            >
              All
            </button>
            <button
              className={filter === "pending" ? "active" : ""}
              onClick={() => setFilter("pending")}
            >
              Pending
            </button>
            <button
              className={filter === "in-progress" ? "active" : ""}
              onClick={() => setFilter("in-progress")}
            >
              In Progress
            </button>
            <button
              className={filter === "resolved" ? "active" : ""}
              onClick={() => setFilter("resolved")}
            >
              Resolved
            </button>
          </div>

          {/* Complaints List */}
          <div className="support-list">
            {filteredList.map((c) => (
              <div key={c.id} className={`support-card ${c.status}`}>
                <div className="support-card-header">
                  <h4>{c.title}</h4>
                  <span className="support-time">{c.timestamp}</span>
                </div>

                <p className="support-desc">{c.description}</p>

                <div className="support-status">
                  {c.status === "pending" && (
                    <Clock size={18} className="pending" />
                  )}
                  {c.status === "in-progress" && (
                    <MessageSquare size={18} className="in-progress" />
                  )}
                  {c.status === "resolved" && (
                    <CheckCircle size={18} className="resolved" />
                  )}
                  <span className={c.status}>
                    {c.status.replace("-", " ").toUpperCase()}
                  </span>
                </div>

                {c.resolution && (
                  <p className="support-resolution">
                    <strong>Resolution:</strong> {c.resolution}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}