import React, { useState } from "react";
import axios from "axios";
import "./ChatBot.css";

const defaultMessages = [
  "Hi, how can I help you?",
  "What can I do for you today?",
  "Feel free to ask me anything!",
  "Need assistance with something?"
];

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(true);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim()) return;

    // Add user message to chat
    setMessages([...messages, { text: messageText, sender: "user" }]);
    setInput("");
    setShowSuggestions(false);

    // Call the API to get the bot response using Axios
    try {
      const response = await axios.post("http://13.60.201.46:5000/get", {
        msg: messageText
      }, {
        headers: { "Content-Type": "application/json" }
      });
      setMessages([...messages, { text: messageText, sender: "user" }, { text: response.data.response, sender: "bot" }]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent default Enter key behavior (e.g., form submission)
      handleSendMessage(input);
    }
  };

  return (
    <div className={`chatbot ${isChatOpen ? "open" : ""}`}>
      <div className="chatbot__button" onClick={toggleChat}>
        <span role="img" aria-label="chat">💬</span>
      </div>
      {isChatOpen && (
        <div className="chatbot__window">
          <div className="chatbot__messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
          </div>
          {showSuggestions && (
            <div className="chatbot__suggestions">
              {defaultMessages.map((suggestion, index) => (
                <button key={index} onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </button>
              ))}
            </div>
          )}
          <div className="chatbot__input">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown} // Add onKeyDown event handler
              placeholder="Type a message..."
            />
            <button onClick={() => handleSendMessage(input)}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
