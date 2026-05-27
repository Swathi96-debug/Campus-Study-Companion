import React, { useRef } from "react";

function SoundPlayer() {
  const audioRef = useRef(null);

  return (
    <div>
      <h3>Focus Sound</h3>
      <audio ref={audioRef} src={process.env.PUBLIC_URL + "/rain.mp3"} />
      <button onClick={() => audioRef.current.play()}>Play</button>
      <button onClick={() => audioRef.current.pause()}>Pause</button>
    </div>
  );
}

export default SoundPlayer;