export default function DetectionCard({ item }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        alignItems: "center",
        background: "#1A212B",
        borderRadius: "16px",
        padding: "16px",
        marginBottom: "15px",
        border: "1px solid #2A3440",
        transition: "0.3s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.border = "1px solid #3B82F6";
        e.currentTarget.style.transform = "translateY(-3px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.border = "1px solid #2A3440";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      <div
        style={{
          width: "90px",
          height: "90px",
          borderRadius: "12px",
          overflow: "hidden",
          flexShrink: 0,
          background: "#111827",
        }}
      >
        <img
          src={item.image}
          alt="Animal"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>

      <div style={{ flex: 1 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
          }}
        >
          <h3
            style={{
              color: "#fff",
              margin: 0,
              fontSize: "20px",
            }}
          >
            {item.animal}
          </h3>

          <span
            style={{
              color: "#9CA3AF",
              fontSize: "14px",
            }}
          >
            {item.time}
          </span>
        </div>

        <p
          style={{
            color: "#D1D5DB",
            margin: "6px 0",
          }}
        >
          Confidence :
          <span
            style={{
              color: "#22C55E",
              fontWeight: "bold",
              marginLeft: "8px",
            }}
          >
            {Math.round(item.confidence * 100)}%
          </span>
        </p>

        <div
          style={{
            width: "100%",
            height: "8px",
            background: "#374151",
            borderRadius: "20px",
            marginTop: "10px",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              width: `${item.confidence * 100}%`,
              height: "100%",
              background: "#22C55E",
            }}
          />
        </div>
      </div>
    </div>
  );
}