import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    year: "",
    gender: ""
  });
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [newPass, setNewPass] = useState("");

  const handleLogin = () => {
    // Validation
    if (!form.name || !form.email || !form.password || !form.year || !form.gender) {
      setError("❌ All fields are mandatory.");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("❌ Please enter a valid email address.");
      return;
    }

    setError("");
    // Save to LocalStorage
    localStorage.setItem("user", JSON.stringify(form));
    navigate("/profile");
  };

  const handleResetPassword = () => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser || savedUser.email !== resetEmail) {
      setError("❌ Email not found in local database.");
      return;
    }
    if (!newPass) {
      setError("❌ Please enter a new password.");
      return;
    }

    savedUser.password = newPass;
    localStorage.setItem("user", JSON.stringify(savedUser));
    setError("");
    setMessage("✅ Password reset successfully! You can now login.");
    setIsForgotPassword(false);
    setResetEmail("");
    setNewPass("");
  };

  if (isForgotPassword) {
    return (
      <div className="container login-container">
        <div className="login-box">
          <h2>🔐 Reset Password</h2>
          <p className="login-subtitle">Enter your registered email to set a new password.</p>
          
          {error && <div className="error-msg">{error}</div>}

          <div className="input-group">
            <label>📧 Email</label>
            <input
              type="email"
              placeholder="Enter your registered email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label>🔑 New Password</label>
            <input
              type="password"
              placeholder="Enter new password"
              value={newPass}
              onChange={(e) => setNewPass(e.target.value)}
            />
          </div>

          <button className="primary-btn login-btn" onClick={handleResetPassword}>
            Update Password
          </button>
          
          <p style={{ marginTop: "15px", cursor: "pointer", textDecoration: "underline" }} onClick={() => { setIsForgotPassword(false); setError(""); }}>
            Back to Login
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container login-container">
      <div className="login-box">
        <h2>👋 Welcome Back!</h2>
        <p className="login-subtitle">Sign in to find your study partners and track your progress.</p>

        {error && <div className="error-msg">{error}</div>}
        {message && <div style={{ background: "#25D366", color: "white", padding: "10px", borderRadius: "8px", marginBottom: "15px", fontWeight: "bold" }}>{message}</div>}

        <div className="input-group">
          <label>👤 Name</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>📧 Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>🔑 Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        <div className="input-group">
          <label>🎓 Year of Study</label>
          <select value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })}>
            <option value="">-- Select Year --</option>
            {[1, 2, 3, 4, 5].map((y) => (
              <option key={y} value={y}>Year {y}</option>
            ))}
          </select>
        </div>

        <div className="input-group gender-group">
          <label>🚻 Gender</label>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={form.gender === "Male"}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              /> 👨 Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={form.gender === "Female"}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
              /> 👩 Female
            </label>
          </div>
        </div>

        <button className="primary-btn login-btn" onClick={handleLogin}>
          🚀 Login
        </button>

        <p style={{ marginTop: "15px", cursor: "pointer", textDecoration: "underline", color: "#ccc" }} onClick={() => { setIsForgotPassword(true); setError(""); setMessage(""); }}>
          Forgot Password?
        </p>
      </div>
    </div>
  );
}

export default Login;