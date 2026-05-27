import React, { useState } from "react";
import "../styles.css";

function Streak() {
  const [days, setDays] = useState(5);

  return (
    <div style={{ textAlign: "center" }}>
      <h2>🔥 Streak</h2>

      <div className="streak-bar">
        <div
          className="streak-fill"
          style={{ width: `${days * 10}%` }}
        ></div>
      </div>

      <p>{days} days</p>

      <button className="btn" onClick={() => setDays(days + 1)}>
        +1 Day
      </button>
    </div>
  );
}

export default Streak;