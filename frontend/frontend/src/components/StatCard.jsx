export default function StatCard({
  title,
  value,
  delta,
  icon,
  color = "#1A212B",
}) {
  return (
    <div
      style={{
        background: color,
        borderRadius: "18px",
        padding: "22px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        border: "1px solid #2A3440",
        boxShadow: "0 8px 20px rgba(0,0,0,0.25)",
        transition: "all .3s ease",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-6px)";
        e.currentTarget.style.borderColor = "#3B82F6";
        e.currentTarget.style.boxShadow =
          "0 15px 30px rgba(59,130,246,.25)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.borderColor = "#2A3440";
        e.currentTarget.style.boxShadow =
          "0 8px 20px rgba(0,0,0,0.25)";
      }}
    >
      <div>

        <p
          style={{
            color: "#9CA3AF",
            fontSize: "14px",
            margin: 0,
            marginBottom: "10px",
          }}
        >
          {title}
        </p>

        <h2
          style={{
            color: "#FFFFFF",
            fontSize: "34px",
            fontWeight: "700",
            margin: 0,
          }}
        >
          {value}
        </h2>

        {delta && (
          <div
            style={{
              display: "inline-block",
              marginTop: "12px",
              padding: "5px 12px",
              background: "rgba(34,197,94,.15)",
              color: "#22C55E",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            ▲ {delta}
          </div>
        )}

      </div>

      <div
        style={{
          width: "70px",
          height: "70px",
          borderRadius: "18px",
          background: "linear-gradient(135deg,#2563EB,#3B82F6)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          fontSize: "30px",
          boxShadow: "0 8px 18px rgba(59,130,246,.35)",
        }}
      >
        {icon}
      </div>
    </div>
  );
}