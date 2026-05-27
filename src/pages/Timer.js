import React, { useState, useEffect } from "react";

function Timer() {
  const [time, setTime] = useState(1500);
  const [run, setRun] = useState(false);

  useEffect(() => {
    if (run) {
      const t = setInterval(()=>setTime(p=>p > 0 ? p-1 : 0),1000);
      return ()=>clearInterval(t);
    }
  }, [run]);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <div className="container timer-container">
      <h2 className="shimmer-text">✨ Pomodoro 🕒 ✨</h2>

      <div className="tomato-wrapper">
        <div className="tomato-leaves">
          <div className="leaf left-leaf"></div>
          <div className="leaf center-leaf"></div>
          <div className="leaf right-leaf"></div>
        </div>
        <div className={`tomato-body ${run ? 'pulsing' : ''}`}>
          <div className="time-display">{formatTime(time)}</div>
        </div>
      </div>

      <div className="timer-controls">
        <button className="glow-btn start-btn" onClick={()=>setRun(true)}>▶ Start</button>
        <button className="glow-btn pause-btn" onClick={()=>setRun(false)}>⏸ Pause</button>
        <button className="glow-btn reset-btn" onClick={()=>setTime(1500)}>⟲ Reset</button>
      </div>

      <div className="sound-player">
        <p>🎵 Study Ambiance</p>
       <audio
  controls
  src={process.env.PUBLIC_URL + "/rain.mp3"}
  className="clean-audio"
></audio>
      </div>
    </div>
  );
}

export default Timer;