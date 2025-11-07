import { useState } from "react";
import axios from "axios";
import Header from '../../components/Header.jsx';
import SideBar from '../../components/SideBar-student.jsx';
import AIChat from '../../components/AiChat.jsx';
import "./Notes.css";
import { Smile } from "lucide-react";
// --- MAKE SURE THESE ARE IMPORTED ---
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NotesPage() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    // --- STATE IS DIFFERENT HERE (no 'response') ---
    const [pdfUrl, setPdfUrl] = useState(null);
    const [showChat, setShowChat] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        // Hides old PDF preview if you pick a new file
        setPdfUrl(null);
    }

    const uploadPDF = async () => {
        if (!file) {
            toast.warn("Please select a PDF first"); // <-- Uses toast
            return;
        }

        const formData = new FormData();
        formData.append("file", file);

        try {
            setLoading(true);
            const res = await axios.post(
                "http://127.0.0.1:8000/load-pdf",
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );

            // --- SUCCESS: Uses toast, not setState ---
            toast.success(res.data.message || "PDF uploaded successfully!");

            // --- Creates a URL to show the PDF ---
            const blobUrl = URL.createObjectURL(file);
            setPdfUrl(blobUrl);

        } catch (error) {
            // --- ERROR: Uses toast ---
            console.error(error);
            const errorMessage = error.response?.data?.error || "Failed to upload PDF";
            toast.error(errorMessage);
            setPdfUrl(null);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="notes-page-layout">
            <SideBar activePage={'notes'} />

            <main className="main-content">
                {/* --- ADD THIS FOR TOASTS TO WORK --- */}
                <ToastContainer
                    theme="dark"
                    position="bottom-right"
                    autoClose={3000}
                />


                <Header
                    title="Notes"
                    subtitle="Upload and manage your course notes"
                />
                {pdfUrl && (
                    <div className="pdf-viewer-container">
                        <iframe
                            src={pdfUrl}
                            title={file?.name || "Uploaded PDF"}
                            width="100%"
                            height="100%"
                        />
                    </div>
                )}
                <div className="content-area">
                    <div className="upload-card">
                        <h3>Upload Notes (PDF)</h3>

                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange} // <-- Use new handler
                            className="upload-input"
                        />

                        <button onClick={uploadPDF} className="upload-btn" disabled={loading}>
                            {loading ? "Uploading..." : "Upload PDF"}
                        </button>

                        {/* --- The JSON <pre> block is GONE --- */}
                    </div>

                    {/* --- NEW PDF VIEWER SECTION --- */}

                </div>

                {/* Chat FAB */}
                <button className="s-fab-chat-btn" onClick={() => setShowChat(true)}>
                    {/* Replaced the SVG with the Lucide icon component */}
                    <Smile size={32} />
                </button>

                {showChat && <AIChat onClose={() => setShowChat(false)} />}
            </main>
        </div>
    );
}

export default NotesPage;