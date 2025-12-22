import React, { useState, useEffect, useRef } from 'react';
import './aichat.css';

const AIChat = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, type: 'ai', text: "Hi! I'm Abdullah's AI assistant. How can I help you today?" }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const quickQuestions = [
        "What are your core skills?",
        "Tell me about your latest project",
        "How can I contact you?",
        "Are you available for freelance?"
    ];

    const getAIResponse = (input) => {
        const lowerInput = input.toLowerCase();

        if (lowerInput.includes('skills')) {
            return "Abdullah excels in React, JavaScript, Responsive Design, and modern CSS techniques. He also has experience with Flutter and Firebase.";
        } else if (lowerInput.includes('project') || lowerInput.includes('work')) {
            return "Abdullah has worked on several premium projects including modern portfolio designs, mobile apps, and dashboard interfaces. Check out the 'Work' section for details!";
        } else if (lowerInput.includes('contact') || lowerInput.includes('hire') || lowerInput.includes('freelance')) {
            return "You can reach Abdullah via the Contact form below, or connect with him on LinkedIn and GitHub. He's always open to new opportunities!";
        } else {
            return "That's a great question! I'm still learning, but you can explore Abdullah's portfolio or use the contact form to ask him directly.";
        }
    };

    const handleSend = (text = inputValue) => {
        if (!text.trim()) return;

        // Add user message
        const newUserMessage = { id: Date.now(), type: 'user', text };
        setMessages(prev => [...prev, newUserMessage]);
        setInputValue('');

        // Simulate AI thinking
        setIsTyping(true);
        setTimeout(() => {
            const aiResponse = getAIResponse(text);
            setMessages(prev => [...prev, { id: Date.now() + 1, type: 'ai', text: aiResponse }]);
            setIsTyping(false);
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className="ai-chat-container">
            {isOpen && (
                <div className="ai-chat-window">
                    <div className="ai-chat-header">
                        <h3>AI Assistant</h3>
                        <div className="ai-chat-close" onClick={() => setIsOpen(false)}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </div>
                    </div>

                    <div className="ai-chat-messages">
                        {messages.map(msg => (
                            <div key={msg.id} className={`ai-chat-message message-${msg.type}`}>
                                {msg.text}
                            </div>
                        ))}
                        {isTyping && (
                            <div className="typing-indicator">
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {!isTyping && messages.length < 5 && (
                        <div className="ai-chat-quick-questions">
                            {quickQuestions.map((q, idx) => (
                                <button
                                    key={idx}
                                    className="quick-question"
                                    onClick={() => handleSend(q)}
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    )}

                    <div className="ai-chat-input-area">
                        <input
                            type="text"
                            className="ai-chat-input"
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyPress={handleKeyPress}
                        />
                        <button
                            className="ai-chat-send"
                            onClick={() => handleSend()}
                            disabled={!inputValue.trim()}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </div>
            )}

            <button
                className={`ai-chat-toggle ${isOpen ? 'active' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle AI Chat"
            >
                {isOpen ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                    </svg>
                )}
            </button>
        </div>
    );
};

export default AIChat;
