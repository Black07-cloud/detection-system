import "../styles/wildlife3d.css";

export default function Wildlife3D() {
  return (
    <div className="wildlife-3d">

      <div className="elephant-glow"></div>

      <div className="elephant-ring ring-1"></div>
      <div className="elephant-ring ring-2"></div>

      <img
        src="/images/elephant.png"
        alt="WildGuard Elephant"
        className="elephant-image"
      />

      <div className="scan-line"></div>

      <div className="ai-label">
        <span className="ai-dot"></span>
        AI DETECTED
      </div>

    </div>
  );
}