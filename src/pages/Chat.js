import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function Chat() {
  const location = useLocation();
  const [chats, setChats] = useState({});
  const [input, setInput] = useState("");
  const [currentUser, setCurrentUser] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("chats")) || {};
    setChats(saved);

    // If navigated from Groups with a specific user
    if (location.state && location.state.userToChat) {
      const user = location.state.userToChat;
      setCurrentUser(user);
      if (!saved[user]) {
        saved[user] = [];
        setChats({...saved});
        localStorage.setItem("chats", JSON.stringify(saved));
      }
    }
  }, [location.state]);

  const send = () => {
    if (!input.trim() || !currentUser) return;

    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const updated = {
      ...chats,
      [currentUser]: [...(chats[currentUser] || []), { text: input, me: true, time: timestamp }]
    };

    setChats(updated);
    localStorage.setItem("chats", JSON.stringify(updated));
    setInput("");

    // Simulate auto reply after 1 sec for demo purposes since there's no backend
    setTimeout(() => {
      const replyTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const withReply = {
        ...updated,
        [currentUser]: [...(updated[currentUser] || []), { text: "Got it! Let's study.", me: false, time: replyTime }]
      };
      setChats(withReply);
      localStorage.setItem("chats", JSON.stringify(withReply));
    }, 1000);
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats, currentUser]);

  return (
    <div className="wa-container">
      {/* LEFT SIDEBAR */}
      <div className="wa-sidebar">
        <h3 className="wa-header">Chats</h3>
        <div className="wa-chat-list">
          {Object.keys(chats).map((u, i) => (
            <div key={i} className={`wa-chat-item ${currentUser === u ? "active" : ""}`} onClick={() => setCurrentUser(u)}>
              <div className="wa-avatar">👤</div>
              <div className="wa-contact-name">{u}</div>
            </div>
          ))}
          {Object.keys(chats).length === 0 && <p style={{padding: "10px", color: "gray"}}>No recent chats</p>}
        </div>
      </div>

      {/* RIGHT CHAT */}
      <div className="wa-chat-area">
        {currentUser ? (
          <>
            <div className="wa-header">
              <div className="wa-avatar">👤</div>
              <h3>{currentUser}</h3>
            </div>
            
            <div className="wa-messages">
              {(chats[currentUser] || []).map((m, i) => (
                <div key={i} className={`wa-msg-wrapper ${m.me ? 'me' : 'other'}`}>
                  <div className={`wa-msg bubble-${m.me ? 'green' : 'white'}`}>
                    <span className="wa-text">{m.text}</span>
                    <span className="wa-meta">
                      {m.time || "12:00"} {m.me && <span className="wa-ticks">✓✓</span>}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            <div className="wa-input-area">
              <input 
                className="wa-input" 
                placeholder="Type a message" 
                value={input} 
                onChange={(e)=>setInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && send()}
              />
              <button className="wa-send-btn" onClick={send}>➤</button>
            </div>
          </>
        ) : (
          <div className="wa-empty-state">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chat;