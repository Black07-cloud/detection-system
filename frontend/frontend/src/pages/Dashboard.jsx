import DetectionList from "../components/DetectionList";
import Wildlife3D from "../components/Wildlife3D";
import useFetch from "../hooks/useFetch";
import { useNavigate } from "react-router-dom";

import {
  FiCamera,
  FiActivity,
  FiTarget,
  FiArrowUpRight,
  FiShield,
} from "react-icons/fi";

import "../styles/dashboard.css";

export default function Dashboard() {
  const { data: history, loading } = useFetch("/history");
  const navigate = useNavigate();

  const detections = Array.isArray(history) ? history : [];

  /* =========================
     STATISTICS
  ========================= */

  const totalImages = detections.length;

  const totalAnimals = detections.reduce(
    (sum, item) => sum + (item.totalAnimals || 0),
    0
  );

  /* =========================
     ANIMAL COUNT
  ========================= */

  const animalCount = {};

  detections.forEach((item) => {
    item.detectedAnimals?.forEach((animal) => {
      animalCount[animal.name] =
        (animalCount[animal.name] || 0) + 1;
    });
  });

  const mostDetected = Object.entries(animalCount).sort(
    (a, b) => b[1] - a[1]
  )[0];

  /* =========================
     RECENT DETECTIONS
  ========================= */

  const recent = detections.slice(0, 5);

  /* =========================
     AVERAGE CONFIDENCE
  ========================= */

  let confidenceTotal = 0;
  let confidenceCount = 0;

  detections.forEach((item) => {
    item.detectedAnimals?.forEach((animal) => {
      confidenceTotal += animal.confidence || 0;
      confidenceCount++;
    });
  });

  const averageConfidence =
    confidenceCount > 0
      ? Math.round(
          (confidenceTotal / confidenceCount) * 100
        )
      : 0;

  return (
    <div className="wildguard-dashboard">

      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section className="hero-section">

        <div className="hero-content">

          <div className="hero-badge">
            <FiShield />
            AI WILDLIFE MONITORING
          </div>

          <h1>
            Protect Wildlife
            <br />
            With <span>Intelligent AI</span>
          </h1>

          <p>
            Monitor wildlife activity, detect animals,
            and analyze field images using AI-powered
            detection technology.
          </p>

          <button
            className="hero-btn"
            onClick={() => navigate("/detect")}
          >
            <FiCamera />
            Start New Detection
            <FiArrowUpRight />
          </button>

        </div>

        {/* =========================================
            3D WILDLIFE
        ========================================= */}

        <div className="hero-visual">

          <div className="glow-orb"></div>

          <div className="scan-ring ring-one"></div>

          <div className="scan-ring ring-two"></div>

          <div className="animal-shadow"></div>

          {/* ACTUAL 3D COMPONENT */}

          <Wildlife3D />

          {/* Floating Detection Card */}

          <div className="floating-card card-one">

            <FiTarget />

            <div>
              <strong>AI Detection</strong>
              <small>Active</small>
            </div>

          </div>

          {/* Floating System Card */}

          <div className="floating-card card-two">

            <FiActivity />

            <div>
              <strong>System</strong>
              <small>Online</small>
            </div>

          </div>

        </div>

      </section>

      {/* =========================================
          STATISTICS
      ========================================= */}

      <section className="stats-grid">

        {/* Total Images */}

        <div className="wild-stat-card">

          <div>
            <p>Total Images</p>

            <h2>
              {totalImages}
            </h2>

            <span>
              Images analyzed
            </span>
          </div>

          <div className="stat-icon blue">
            <FiCamera />
          </div>

        </div>

        {/* Total Animals */}

        <div className="wild-stat-card">

          <div>
            <p>Animals Detected</p>

            <h2>
              {totalAnimals}
            </h2>

            <span>
              Total detections
            </span>
          </div>

          <div className="stat-icon green">
            <FiActivity />
          </div>

        </div>

        {/* AI Confidence */}

        <div className="wild-stat-card">

          <div>
            <p>AI Confidence</p>

            <h2>
              {averageConfidence}%
            </h2>

            <span>
              Average confidence
            </span>
          </div>

          <div className="stat-icon purple">
            <FiTarget />
          </div>

        </div>

      </section>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}

      <section className="dashboard-content">

        {/* =========================================
            RECENT DETECTIONS
        ========================================= */}

        <div className="recent-section">

          <div className="section-heading">

            <div>
              <span>MONITORING</span>

              <h2>
                Recent Detections
              </h2>
            </div>

            <button
              onClick={() => navigate("/history")}
              className="view-all-btn"
            >
              View All
              <FiArrowUpRight />
            </button>

          </div>

          {loading ? (
            <div className="loading-box">
              Loading wildlife detections...
            </div>
          ) : (
            <DetectionList items={recent} />
          )}

        </div>

        {/* =========================================
            MONITOR PANEL
        ========================================= */}

        <aside className="monitor-panel">

          <div className="panel-header">

            <div>
              <span>LIVE MONITOR</span>

              <h2>
                WildGuard Status
              </h2>
            </div>

            <div className="status-dot"></div>

          </div>

          {/* Radar */}

          <div className="monitor-visual">

            <div className="radar-circle">

              <div className="radar-line"></div>

              <div className="radar-point"></div>

            </div>

            <span>
              AI SCANNING
            </span>

          </div>

          {/* Most Detected */}

          <div className="monitor-info">

            <div>

              <span>
                Most Detected
              </span>

              <strong>
                {mostDetected
                  ? mostDetected[0]
                  : "No Data"}
              </strong>

            </div>

            <div>

              <span>
                Detection Count
              </span>

              <strong>
                {mostDetected
                  ? mostDetected[1]
                  : 0}
              </strong>

            </div>

          </div>

          {/* System Status */}

          <div className="system-status">

            <div>
              <span className="online-dot"></span>
              Express Backend
            </div>

            <strong>
              ONLINE
            </strong>

          </div>

          <div className="system-status">

            <div>
              <span className="online-dot"></span>
              MongoDB
            </div>

            <strong>
              CONNECTED
            </strong>

          </div>

          <div className="system-status">

            <div>
              <span className="online-dot"></span>
              YOLO AI Model
            </div>

            <strong>
              ACTIVE
            </strong>

          </div>

        </aside>

      </section>

    </div>
  );
}