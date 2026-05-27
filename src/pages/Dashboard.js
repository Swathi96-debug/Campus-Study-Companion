import React, { useState } from "react";

function Dashboard() {
  const [days, setDays] = useState(0);

  // Mock previous 6 days + current day
  const history = [2, 4, 1, 5, 3, 6, days];
  const maxVal = Math.max(...history, 10);

  return (
    <div className="container dashboard-container">
      <h2>🔥 Your Study Streaks</h2>
      <p className="subtitle">Keep tracking your daily study sessions!</p>

      <div className="chart-card">
        <div className="bar-graph">
          {history.map((val, idx) => (
            <div key={idx} className="bar-wrap">
              <div 
                className={`vert-bar ${idx === history.length - 1 ? 'current-day' : ''}`} 
                style={{ height: `${(val / maxVal) * 100}%` }}
              >
                <div className="tooltip">{val} days</div>
              </div>
              <span className="day-label">D{idx + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="streak-controls">
        <div className="streak-stat">
          <span className="stat-number">{days}</span>
          <span className="stat-text">Current Streak (Days)</span>
        </div>
        <button className="primary-btn pulse-btn" onClick={() => setDays(days + 1)}>
          + Log Today's Study
        </button>
      </div>
    </div>
  );
}

export default Dashboard;