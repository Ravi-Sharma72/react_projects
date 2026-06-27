import { useState } from "react";

function App() {
  const [bgColor, setBgColor] = useState("white");

  const topBarStyle = {
    position: "fixed",
    top: "24px",
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 50,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: "10px",
    padding: "14px 18px",
    borderRadius: "9999px",
    backgroundColor: "rgba(255, 255, 255, 0.96)",
    boxShadow: "0 18px 60px rgba(15, 23, 42, 0.12)",
    backdropFilter: "blur(16px)",
  };

  const buttonStyle = {
    borderRadius: "9999px",
    padding: "10px 18px",
    border: "none",
    cursor: "pointer",
    color: "#fff",
    fontWeight: 600,
    boxShadow: "0 12px 24px rgba(15, 23, 42, 0.14)",
    minWidth: "88px",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: bgColor,
        margin: 0,
        position: "relative",
        fontFamily: "system-ui, sans-serif",
        color: "#0f172a",
      }}
    >
      <div style={topBarStyle}>
        <button
          style={{ ...buttonStyle, backgroundColor: "#ef4444" }}
          onClick={() => setBgColor("red")}
        >
          red
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: "#22c55e" }}
          onClick={() => setBgColor("green")}
        >
          green
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: "#3b82f6" }}
          onClick={() => setBgColor("blue")}
        >
          blue
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: "#f59e0b" }}
          onClick={() => setBgColor("yellow")}
        >
          yellow
        </button>
        <button
          style={{ ...buttonStyle, backgroundColor: "#8b5cf6" }}
          onClick={() => setBgColor("purple")}
        >
          purple
        </button>
      </div>

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingTop: "120px",
        }}
      >
        <div
          style={{
            maxWidth: "740px",
            width: "100%",
            margin: "0 16px",
            padding: "40px 32px",
            textAlign: "center",
            borderRadius: "32px",
            backgroundColor: "rgba(255,255,255,0.95)",
            boxShadow: "0 20px 80px rgba(15, 23, 42, 0.12)",
          }}
        >
          <h1 style={{ fontSize: "3rem", margin: 0, lineHeight: 1.1 }}>
            Background Color Changer
          </h1>
          <p
            style={{ marginTop: "18px", fontSize: "1.05rem", color: "#475569" }}
          >
            Click any button above to change the full-screen background color.
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
