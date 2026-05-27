import React, { useRef, useState, useEffect } from "react";

function Whiteboard() {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [ctx, setCtx] = useState(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 800;
    canvas.height = 500;
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineJoin = "round";
    context.strokeStyle = "#fff";
    context.lineWidth = 5;
    setCtx(context);
    
    // Fill initial background
    context.fillStyle = "#2c3e50";
    context.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e) => {
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const endDrawing = () => {
    if (isDrawing) {
      ctx.closePath();
      setIsDrawing(false);
    }
  };

  const setHover = (val) => {
    document.getElementById("canvas-title").style.color = val ? "#ff7a5c" : "#fff";
  };

  const clearCanvas = () => {
    ctx.fillStyle = "#2c3e50";
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className="container" style={{ textAlign: "center" }}>
      {/* Demonstrating onmouseover & onmouseout as requested in M4 */}
      <h2 
        id="canvas-title"
        onMouseOver={() => setHover(true)} 
        onMouseOut={() => setHover(false)}
        style={{ transition: "0.3s" }}
      >
        🎨 Study Whiteboard
      </h2>
      <p>Draw diagrams or formulas directly on the HTML5 Canvas!</p>

      <canvas
        ref={canvasRef}
        className="whiteboard-canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing} // Prevent drawing glitch if mouse leaves
      />
      <br />
      <button className="primary-btn" style={{ width: "200px", marginTop: "15px" }} onClick={clearCanvas}>
        🗑️ Clear Board
      </button>
    </div>
  );
}

export default Whiteboard;
