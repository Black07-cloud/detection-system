import { useState } from "react";
import UploadArea from "../components/UploadArea";
import api from "../services/api";

import {
  FiUploadCloud,
  FiCheckCircle,
  FiRefreshCw,
  FiTarget,
  FiActivity,
} from "react-icons/fi";

import "../styles/detect.css";

export default function Detect() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  /* =========================
     DETECT
  ========================= */

  async function handleDetect() {
    if (!file) return;

    setLoading(true);
    setResult(null);

    const formData = new FormData();

    formData.append("image", file);

    try {
      const response = await api.post(
        "/detect",
        formData
      );

      setResult(response.data);

    } catch (error) {
      console.error(
        "Detection error:",
        error
      );

      setResult({
        success: false,
        message:
          error.response?.data?.message ||
          "Detection failed. Please try again.",
      });

    } finally {
      setLoading(false);
    }
  }


  /* =========================
     RESET
  ========================= */

  function resetDetection() {
    setFile(null);
    setResult(null);
  }


  const detection =
    result?.success
      ? result.data
      : null;


  return (
    <div className="detect-page">

      {/* =========================
          HEADER
      ========================= */}

      <div className="detect-header">

        <div>

          <span className="page-label">
            AI WILDLIFE ANALYSIS
          </span>

          <h1>
            Animal Detection
          </h1>

          <p>
            Upload a wildlife image and let
            WildGuard AI identify animals
            automatically.
          </p>

        </div>

      </div>


      {/* =========================
          MAIN GRID
      ========================= */}

      <div className="detect-grid">

        {/* =========================
            UPLOAD CARD
        ========================= */}

        <div className="upload-card">

          <div className="upload-title">

            <div className="upload-icon">
              <FiUploadCloud />
            </div>

            <div>

              <h2>
                Upload Wildlife Image
              </h2>

              <p>
                JPG, JPEG or PNG · Maximum 10MB
              </p>

            </div>

          </div>


          {/* UPLOAD */}

          <UploadArea
            onFile={setFile}
          />


          {/* SELECTED FILE */}

          {file && (
            <div className="selected-file">

              <div>

                <strong>
                  {file.name}
                </strong>

                <span>
                  {(
                    file.size /
                    1024 /
                    1024
                  ).toFixed(2)} MB
                </span>

              </div>

              <FiCheckCircle />

            </div>
          )}


          {/* ACTIONS */}

          <div className="detect-actions">

            <button
              className="detect-btn"
              onClick={handleDetect}
              disabled={
                !file || loading
              }
            >

              {loading ? (
                <>
                  <span className="loading-spinner"></span>

                  AI Detecting...
                </>
              ) : (
                <>
                  <FiTarget />

                  Detect Animal
                </>
              )}

            </button>


            <button
              className="reset-btn"
              onClick={resetDetection}
              disabled={loading}
            >

              <FiRefreshCw />

              New Scan

            </button>

          </div>

        </div>


        {/* =========================
            RESULT
        ========================= */}

        {result && (

          <div className="result-card">

            {/* ERROR */}

            {result.success === false ? (

              <div className="error-message">

                <strong>
                  Detection Failed
                </strong>

                <p>
                  {result.message}
                </p>

              </div>

            ) : (

              <>

                {/* RESULT HEADER */}

                <div className="result-header">

                  <div>

                    <span>
                      DETECTION RESULT
                    </span>

                    <h2>
                      AI Analysis Complete
                    </h2>

                  </div>

                  <div className="success-badge">

                    <FiCheckCircle />

                    Detected

                  </div>

                </div>


                {/* IMAGE */}

                {detection?.imagePath && (

                  <div className="result-image-container">

                    <img
                      src={`http://localhost:5000/${detection.imagePath.replace(
                        /\\/g,
                        "/"
                      )}`}
                      alt="Detection result"
                      className="result-image"
                    />

                    <div className="image-overlay">
                      AI ANALYSIS
                    </div>

                  </div>

                )}


                {/* SUMMARY */}

                <div className="result-summary">

                  <div className="summary-box">

                    <div className="summary-icon blue">
                      <FiActivity />
                    </div>

                    <div>

                      <span>
                        Total Animals
                      </span>

                      <strong>
                        {detection?.totalAnimals ||
                          0}
                      </strong>

                    </div>

                  </div>


                  <div className="summary-box">

                    <div className="summary-icon green">
                      <FiTarget />
                    </div>

                    <div>

                      <span>
                        Animals Detected
                      </span>

                      <strong>
                        {detection
                          ?.detectedAnimals
                          ?.length || 0}
                      </strong>

                    </div>

                  </div>

                </div>


                {/* ANIMALS */}

                <div className="animals-section">

                  <div className="animals-title">

                    <div>

                      <span>
                        AI IDENTIFICATION
                      </span>

                      <h3>
                        Detected Animals
                      </h3>

                    </div>

                  </div>


                  {detection
                    ?.detectedAnimals
                    ?.length > 0 ? (

                    <div className="animal-list">

                      {detection.detectedAnimals.map(
                        (animal, index) => {

                          const confidence =
                            Math.round(
                              (animal.confidence ||
                                0) * 100
                            );

                          return (

                            <div
                              className="animal-result"
                              key={index}
                            >

                              <div className="animal-main">

                                <div className="animal-number">
                                  {index + 1}
                                </div>

                                <div className="animal-name">

                                  <strong>
                                    {animal.name}
                                  </strong>

                                  <span>
                                    Wildlife detected
                                  </span>

                                </div>

                                <div className="confidence-value">
                                  {confidence}%
                                </div>

                              </div>


                              <div className="confidence-bar">

                                <div
                                  className="confidence-progress"
                                  style={{
                                    width:
                                      `${confidence}%`,
                                  }}
                                />

                              </div>

                            </div>
                          );
                        }
                      )}

                    </div>

                  ) : (

                    <div className="no-animal">

                      <FiActivity />

                      <span>
                        No animals detected
                      </span>

                    </div>

                  )}

                </div>

              </>
            )}

          </div>

        )}

      </div>

    </div>
  );
}