import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './AiChat.css';
import { X, Bot, Send, User } from 'lucide-react';

const AIChat = ({ onClose }) => {
    const [inputQuery, setInputQuery] = useState("");
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            text: "Hello! How can I help you with your schedule or campus questions today?"
        }
    ]);
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, loading]);

    const handleSendQuery = async () => {
        if (inputQuery.trim() === "" || loading) return;

        const userMessage = {
            id: messages.length + 1,
            sender: 'user',
            text: inputQuery.trim()
        };

        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputQuery("");
        setLoading(true);

        // --- THIS IS THE PAYLOAD ---
        // It matches your required format exactly.
        const requestPayload = {
            question: userMessage.text,
            top_k: 4, // Using 4 as it's a standard value and in your example
            source_type: null
        };

        try {
            // Post the exact payload structure
            const res = await axios.post("http://127.0.0.1:8000/query", requestPayload);

            // We still expect the response to have an 'answer' key
            const aiResponseText = res.data.answer || "Sorry, I couldn't get a response.";

            const aiMessage = {
                id: messages.length + 2,
                sender: 'ai',
                text: aiResponseText
            };

            setMessages(prevMessages => [...prevMessages, aiMessage]);

        } catch (error) {
            console.error("Error fetching AI response:", error);
            const errorMessage = {
                id: messages.length + 2,
                sender: 'ai',
                text: "Sorry, I ran into an error. Please try again."
            };
            setMessages(prevMessages => [...prevMessages, errorMessage]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendQuery();
        }
    };

    return (
        <div className="s-chat-overlay">
            <div className="s-chat-window">
                <div className="s-chat-header">
                    <p>AI Assistant</p>
                    <button onClick={onClose} className="s-chat-close-btn">
                        <X size={20} />
                    </button>
                </div>

                <div className="s-chat-messages">
                    {messages.map((msg) => (
                        <div key={msg.id} className={`s-chat-message ${msg.sender}`}>
                            {msg.sender === 'ai' ? (
                                <Bot size={24} className="s-chat-avatar" />
                            ) : (
                                <User size={24} className="s-chat-avatar" />
                            )}
                            <p>{msg.text}</p>
                        </div>
                    ))}

                    {loading && (
                        <div className="s-chat-message ai">
                            <Bot size={24} className="s-chat-avatar" />
                            <p className="loading-dots">
                                <span>.</span><span>.</span><span>.</span>
                            </p>
                        </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                </div>

                <div className="s-chat-input-area">
                    <input
                        type="text"
                        placeholder="Ask about your classes..."
                        value={inputQuery}
                        onChange={(e) => setInputQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={loading}
                    />
                    <button onClick={handleSendQuery} disabled={loading}>
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIChat;