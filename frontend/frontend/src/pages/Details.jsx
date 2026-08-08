import { useParams, useNavigate } from "react-router-dom";
import {
  FiArrowLeft,
  FiDownload,
  FiTrash2,
  FiShield,
  FiTarget,
  FiActivity,
  FiCalendar,
  FiImage,
} from "react-icons/fi";

import useFetch from "../hooks/useFetch";
import api from "../services/api";

import "../styles/details.css";

export default function Details() {
  const { id } = useParams();
  const navigate = useNavigate();

  const {
    data,
    loading,
    error,
  } = useFetch(`/history/${id}`);


  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="details-loading">
        <div className="details-spinner"></div>

        <p>
          Loading detection details...
        </p>
      </div>
    );
  }


  /* =========================
     ERROR
  ========================= */

  if (error) {
    return (
      <div className="details-error">

        <h2>
          Error loading detection
        </h2>

        <p>
          Unable to load this detection.
        </p>

        <button
          onClick={() =>
            navigate("/history")
          }
        >
          <FiArrowLeft />
          Back to History
        </button>

      </div>
    );
  }


  /* =========================
     NO DATA
  ========================= */

  if (!data) {
    return (
      <div className="details-error">

        <h2>
          Detection not found
        </h2>

        <button
          onClick={() =>
            navigate("/history")
          }
        >
          <FiArrowLeft />
          Back to History
        </button>

      </div>
    );
  }


  /* =========================
     ANIMAL
  ========================= */

  const animal =
    data.detectedAnimals?.[0];

  const animalName =
    animal?.name || "Unknown";


  /* =========================
     CONFIDENCE
  ========================= */

  const confidence =
    Math.round(
      (animal?.confidence || 0) * 100
    );


  /* =========================
     IMAGE URL
  ========================= */

  const imageUrl = data.imagePath
    ? `http://localhost:5000/${data.imagePath.replace(
        /\\/g,
        "/"
      )}`
    : null;


  /* =========================
     DELETE
  ========================= */

  const handleDelete = async () => {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this detection?"
      );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/history/${id}`
      );

      alert(
        "Detection deleted successfully."
      );

      navigate("/history");

    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Delete failed"
      );
    }
  };


  /* =========================
     DOWNLOAD
  ========================= */

  const handleDownload = () => {
    if (!imageUrl) return;

    const link =
      document.createElement("a");

    link.href = imageUrl;

    link.download =
      data.imageName ||
      "wildlife-detection.jpg";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);
  };


  return (
    <div className="details-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="details-header">

        <div>

          <button
            className="back-btn"
            onClick={() =>
              navigate("/history")
            }
          >
            <FiArrowLeft />
            Back to History
          </button>

          <span className="details-label">
            AI MONITORING
          </span>

          <h1>
            Detection Details
          </h1>

          <p>
            Detailed information about
            this wildlife detection.
          </p>

        </div>

      </div>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <div className="details-container">

        {/* =========================
            IMAGE
        ========================= */}

        <div className="details-image-card">

          <div className="image-card-header">

            <div>
              <span>
                DETECTED IMAGE
              </span>

              <h3>
                AI Analysis
              </h3>
            </div>

            <FiImage />

          </div>


          <div className="details-image-wrapper">

            {imageUrl ? (

              <img
                src={imageUrl}
                alt={animalName}
              />

            ) : (

              <div className="details-no-image">
                No Image Available
              </div>

            )}

            {/* Detection Badge */}

            <div className="detection-badge">

              <FiTarget />

              <span>
                AI DETECTED
              </span>

            </div>

          </div>

        </div>


        {/* =========================
            INFORMATION
        ========================= */}

        <div className="details-info-card">

          <div className="info-card-header">

            <div>

              <span>
                DETECTION RESULT
              </span>

              <h2>
                {animalName}
              </h2>

            </div>

            <div className="animal-icon">
              🐾
            </div>

          </div>


          {/* Confidence */}

          <div className="detail-stat">

            <div className="detail-stat-top">

              <div className="detail-stat-title">

                <FiTarget />

                <span>
                  AI Confidence
                </span>

              </div>

              <strong>
                {confidence}%
              </strong>

            </div>


            <div className="confidence-progress">

              <div
                style={{
                  width: `${confidence}%`,
                }}
              />

            </div>

          </div>


          {/* Total Animals */}

          <div className="detail-stat">

            <div className="detail-stat-icon green">
              <FiActivity />
            </div>

            <div>

              <span>
                Total Animals
              </span>

              <strong>
                {data.totalAnimals || 0}
              </strong>

            </div>

          </div>


          {/* Date */}

          <div className="detail-stat">

            <div className="detail-stat-icon blue">
              <FiCalendar />
            </div>

            <div>

              <span>
                Detection Date
              </span>

              <strong>
                {new Date(
                  data.createdAt
                ).toLocaleDateString()}
              </strong>

              <small>
                {new Date(
                  data.createdAt
                ).toLocaleTimeString(
                  [],
                  {
                    hour: "2-digit",
                    minute: "2-digit",
                  }
                )}
              </small>

            </div>

          </div>


          {/* System */}

          <div className="system-status">

            <FiShield />

            <div>

              <strong>
                WildGuard AI
              </strong>

              <span>
                Detection completed successfully
              </span>

            </div>

            <div className="online-dot"></div>

          </div>


          {/* Actions */}

          <div className="details-actions">

            <button
              className="download-btn"
              onClick={handleDownload}
            >
              <FiDownload />
              Download Image
            </button>


            <button
              className="delete-btn"
              onClick={handleDelete}
            >
              <FiTrash2 />
              Delete
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}