export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "80vh",
        background: "#0B0F14",
        color: "#fff",
      }}
    >
      <div
        style={{
          textAlign: "center",
          background: "#1A212B",
          padding: "50px",
          borderRadius: "18px",
          border: "1px solid #2A3440",
          boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
          maxWidth: "450px",
          width: "90%",
        }}
      >
        <h1
          style={{
            fontSize: "90px",
            margin: "0",
            color: "#3B82F6",
            fontWeight: "bold",
          }}
        >
          404
        </h1>

        <h2
          style={{
            marginTop: "15px",
            marginBottom: "10px",
            fontSize: "28px",
          }}
        >
          Page Not Found
        </h2>

        <p
          style={{
            color: "#9CA3AF",
            marginBottom: "30px",
            lineHeight: "1.6",
          }}
        >
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>

        <button
          onClick={() => (window.location.href = "/dashboard")}
          style={{
            padding: "12px 28px",
            background: "#2563EB",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}