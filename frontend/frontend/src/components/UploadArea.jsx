import { useState } from "react";

export default function UploadArea({ onFile }) {
  const [preview, setPreview] = useState(null);

  function handleFile(e) {
    const file = e.target.files?.[0];

    if (!file) return;

    setPreview(URL.createObjectURL(file));

    if (onFile) onFile(file);
  }

  return (
    <div
      style={{
        background: "#1A212B",
        borderRadius: "18px",
        padding: "25px",
        border: "1px solid #2A3440",
        color: "#fff",
      }}
    >
      <label
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          border: "2px dashed #3B82F6",
          borderRadius: "15px",
          padding: "50px 20px",
          cursor: "pointer",
          transition: "0.3s",
          background: "#12171E",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#18212B";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#12171E";
        }}
      >
        <div
          style={{
            fontSize: "50px",
            marginBottom: "15px",
          }}
        >
          📤
        </div>

        <h2
          style={{
            margin: 0,
            marginBottom: "10px",
            fontSize: "22px",
          }}
        >
          Upload Animal Image
        </h2>

        <p
          style={{
            color: "#9CA3AF",
            marginBottom: "15px",
          }}
        >
          Drag & Drop or Click to Select
        </p>

        <small
          style={{
            color: "#6B7280",
          }}
        >
          Supported Formats: JPG, PNG, JPEG
        </small>

        <input
          type="file"
          accept="image/*"
          onChange={handleFile}
          style={{
            display: "none",
          }}
        />
      </label>

      {preview && (
        <div
          style={{
            marginTop: "25px",
          }}
        >
          <img
            src={preview}
            alt="Preview"
            style={{
              width: "100%",
              maxHeight: "450px",
              objectFit: "contain",
              borderRadius: "15px",
              border: "1px solid #2A3440",
            }}
          />
        </div>
      )}
    </div>
  );
}