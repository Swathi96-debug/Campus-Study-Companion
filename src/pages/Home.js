import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container home-container">
      <h1 className="hero-title">📖 Campus Study Companion</h1>

      <p className="hero-subtitle">
        Find study partners, stay focused with Pomodoro, and build streaks together.
      </p>

      <div className="features-container">
        <div className="feature-card" onClick={() => navigate("/groups")}>📚 Study Groups</div>
        <div className="feature-card" onClick={() => navigate("/timer")}>🍅 Timer + Focus</div>
        <div className="feature-card" onClick={() => navigate("/dashboard")}>🔥 Streaks</div>
        <div className="feature-card" onClick={() => navigate("/chat")}>💬 Chat</div>
      </div>

      <div className="image-stack">
        <img src="/study.png" alt="Study" className="stack-img img1" />
        <img src="/timer.png" alt="Timer" className="stack-img img2" />
        <img src="/book.png" alt="Book" className="stack-img img3" />
      </div>

      <footer className="footer-fancy">
        ❤️ Made with love by a VITian for VITians ❤️
      </footer>
    </div>
  );
}

export default Home;