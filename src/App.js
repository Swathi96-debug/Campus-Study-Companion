import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Groups from "./pages/Groups";
import Timer from "./pages/Timer";
import Dashboard from "./pages/Dashboard";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import Whiteboard from "./pages/Whiteboard";
import Goals from "./pages/Goals";
import "./styles.css";

function App() {
  return (
    <Router>
      <nav className="nav">
        <Link to="/">🏠 Home</Link>
        <Link to="/groups">📚 Study Groups</Link>
        <Link to="/timer">🍅 Focus Timer</Link>
        <Link to="/dashboard">🔥 Streaks</Link>
        <Link to="/goals">📋 Goals</Link>
        <Link to="/whiteboard">🎨 Whiteboard</Link>
        <Link to="/chat">💬 Chat</Link>
        <Link to="/profile">👤 Profile</Link>
        <Link to="/login" style={{ marginLeft: "auto" }}>🔐 Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/groups" element={<Groups />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/whiteboard" element={<Whiteboard />} />
        <Route path="/goals" element={<Goals />} />
      </Routes>
    </Router>
  );
}

export default App;
