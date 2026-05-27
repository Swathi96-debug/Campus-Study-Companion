import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleResetPassword = () => {
    if (!newPassword) {
      setMessage("❌ Please enter a new password.");
      return;
    }
    const updatedUser = { ...user, password: newPassword };
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setNewPassword("");
    setMessage("✅ Password updated successfully.");
  };

  if (!user) {
    return (
      <div className="container">
        <h2>👤 Profile</h2>
        <p>No user data found. Please login first.</p>
        <button className="primary-btn" onClick={() => navigate("/login")}>Go to Login</button>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>👤 User Profile</h2>
      <div className="profile-card-container">
        <table className="profile-table">
          <tbody>
            <tr>
              <th>Name</th>
              <td>{user.name}</td>
            </tr>
            <tr>
              <th>Email</th>
              <td>{user.email}</td>
            </tr>
            <tr>
              <th>Gender</th>
              <td>{user.gender}</td>
            </tr>
            <tr>
              <th>Year of Study</th>
              <td>Year {user.year}</td>
            </tr>
          </tbody>
        </table>

        <div className="reset-password-section">
          <h3>Reset Password</h3>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br/>
          <button className="primary-btn" onClick={handleResetPassword}>Update Password</button>
          {message && <p className="msg-text">{message}</p>}
        </div>
      </div>
    </div>
  );
}

export default Profile;