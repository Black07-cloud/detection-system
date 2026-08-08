import DetectionCard from "./DetectionCard";

export default function DetectionList({ items = [] }) {

  if (!items.length) {
    return (
      <div
        style={{
          background: "#1A212B",
          color: "#9CA3AF",
          padding: "30px",
          borderRadius: "16px",
          textAlign: "center",
          border: "1px solid #2A3440",
          fontSize: "16px",
        }}
      >
        No detections yet
      </div>
    );
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "15px",
      }}
    >
      {items.map((item, index) => (
        <DetectionCard
          key={item._id || item.id || index}
          item={{
            image:
              item.image ||
              `http://localhost:5000/${item.imagePath.replace(/\\/g, "/")}`,

            animal:
              item.detectedAnimals?.[0]?.name || "Unknown Animal",

            confidence:
              item.detectedAnimals?.[0]?.confidence || 0,

            time: new Date(item.createdAt).toLocaleString(),
          }}
        />
      ))}
    </div>
  );
}