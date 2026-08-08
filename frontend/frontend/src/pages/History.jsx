import { useEffect, useState } from "react";
import {
  Link,
  useSearchParams,
} from "react-router-dom";

import {
  FiTrash2,
  FiEye,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import api from "../services/api";
import "../styles/history.css";

export default function History() {
  const [searchParams] = useSearchParams();

  const search =
    searchParams.get("search") || "";

  const [items, setItems] = useState([]);
  const [animals, setAnimals] = useState([]);

  const [animalFilter, setAnimalFilter] =
    useState("all");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

  const [page, setPage] =
    useState(1);

  const [total, setTotal] =
    useState(0);

  const [totalPages, setTotalPages] =
    useState(1);

  const limit = 10;

  /* =========================
     FETCH HISTORY
  ========================= */

  async function fetchHistory() {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      // Navbar search
      if (search.trim()) {
        params.set(
          "search",
          search.trim()
        );
      }

      // Animal filter
      if (animalFilter !== "all") {
        params.set(
          "animal",
          animalFilter
        );
      }

      params.set("page", page);
      params.set("limit", limit);

      const response = await api.get(
        `/history?${params.toString()}`
      );

      const result = response.data;

      setItems(
        Array.isArray(result.data)
          ? result.data
          : []
      );

      setTotal(result.total || 0);

      setTotalPages(
        result.totalPages || 1
      );

    } catch (err) {
      console.error(
        "History fetch error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Failed to load detection history."
      );

      setItems([]);

    } finally {
      setLoading(false);
    }
  }

  /* =========================
     LOAD
  ========================= */

  useEffect(() => {
    // Defer resetting page to avoid synchronous setState inside effect
    const t = setTimeout(() => setPage(1), 0);

    return () => clearTimeout(t);
  }, [search]);

  useEffect(() => {
    // Defer fetch to avoid calling setState synchronously within the effect
    const t = setTimeout(() => {
      fetchHistory();
    }, 0);

    return () => clearTimeout(t);
  }, [search, animalFilter, page]);

  /* =========================
     ANIMAL LIST
  ========================= */

  useEffect(() => {
    async function fetchAnimals() {
      try {
        const response = await api.get(
          "/history?limit=100"
        );

        const history =
          Array.isArray(response.data.data)
            ? response.data.data
            : [];

        const names = [];

        history.forEach((item) => {
          item.detectedAnimals?.forEach(
            (animal) => {
              if (
                animal.name &&
                !names.includes(animal.name)
              ) {
                names.push(animal.name);
              }
            }
          );
        });

        setAnimals(
          names.sort((a, b) =>
            a.localeCompare(b)
          )
        );

      } catch (err) {
        console.error(
          "Animal list error:",
          err
        );
      }
    }

    fetchAnimals();
  }, []);

  /* =========================
     ANIMAL FILTER
  ========================= */

  function handleAnimalFilter(e) {
    setAnimalFilter(e.target.value);
    setPage(1);
  }

  /* =========================
     DELETE
  ========================= */

  async function handleDelete(id) {
    const confirmDelete =
      window.confirm(
        "Are you sure you want to delete this detection?"
      );

    if (!confirmDelete) return;

    try {
      await api.delete(
        `/history/${id}`
      );

      if (
        items.length === 1 &&
        page > 1
      ) {
        setPage((prev) => prev - 1);
      } else {
        fetchHistory();
      }

    } catch (err) {
      console.error(
        "Delete error:",
        err
      );

      alert(
        err.response?.data?.message ||
        "Failed to delete detection."
      );
    }
  }

  /* =========================
     REFRESH
  ========================= */

  function handleRefresh() {
    fetchHistory();
  }

  /* =========================
     IMAGE URL
  ========================= */

  function getImageUrl(path) {
    if (!path) return null;

    return `http://localhost:5000/${path.replace(
      /\\/g,
      "/"
    )}`;
  }

  /* =========================
     LOADING
  ========================= */

  if (
    loading &&
    items.length === 0
  ) {
    return (
      <div className="history-loading">
        <div className="history-spinner"></div>

        <p>
          Loading detection history...
        </p>
      </div>
    );
  }

  /* =========================
     ERROR
  ========================= */

  if (
    error &&
    items.length === 0
  ) {
    return (
      <div className="history-error">

        <h3>
          Failed to load history
        </h3>

        <p>{error}</p>

        <button
          className="refresh-btn"
          onClick={handleRefresh}
        >
          <FiRefreshCw />
          Try Again
        </button>

      </div>
    );
  }

  return (
    <div className="history-page">

      {/* HEADER */}

      <div className="history-header">

        <div>
          <span className="history-label">
            AI MONITORING LOG
          </span>

          <h1>
            Detection History
          </h1>

          <p>
            Review previously detected
            wildlife images and AI analysis.
          </p>
        </div>

        <button
          className="refresh-btn"
          onClick={handleRefresh}
          disabled={loading}
        >
          <FiRefreshCw />
          Refresh
        </button>

      </div>


      {/* SEARCH RESULT INDICATOR */}
      {/* Search box itself is NOT here */}

      {search && (
        <div className="search-result-info">
          Showing results for{" "}
          <strong>
            "{search}"
          </strong>
        </div>
      )}


      {/* FILTER */}

      <div className="history-toolbar">

        <select
          value={animalFilter}
          onChange={handleAnimalFilter}
        >
          <option value="all">
            All Animals
          </option>

          {animals.map((animal) => (
            <option
              key={animal}
              value={animal}
            >
              {animal}
            </option>
          ))}
        </select>

        <div className="history-count">
          {total} Records
        </div>

      </div>


      {/* TABLE */}

      <div className="history-table">

        {items.length === 0 ? (

          <div className="history-empty">

            <div className="empty-icon">
              🐾
            </div>

            <h2>
              No detections found
            </h2>

            <p>
              No wildlife detections
              match your search.
            </p>

          </div>

        ) : (

          <table>

            <thead>
              <tr>
                <th>Image</th>
                <th>Animal</th>
                <th>Confidence</th>
                <th>Total</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>

              {items.map((item) => {

                const animal =
                  item.detectedAnimals?.[0];

                const confidence =
                  Math.round(
                    (animal?.confidence || 0) *
                    100
                  );

                const imageUrl =
                  getImageUrl(
                    item.imagePath
                  );

                return (
                  <tr
                    key={item._id}
                  >

                    <td>
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt={
                            animal?.name ||
                            "animal"
                          }
                        />
                      ) : (
                        <div className="no-image">
                          No Image
                        </div>
                      )}
                    </td>

                    <td>
                      <div className="animal-cell">

                        <strong>
                          {animal?.name ||
                            "Unknown"}
                        </strong>

                        <span>
                          Wildlife detection
                        </span>

                      </div>
                    </td>

                    <td>

                      <div className="confidence-cell">

                        <strong>
                          {confidence}%
                        </strong>

                        <div className="mini-progress">
                          <div
                            style={{
                              width:
                                `${confidence}%`,
                            }}
                          />
                        </div>

                      </div>

                    </td>

                    <td>
                      <span className="total-badge">
                        {item.totalAnimals || 0}
                      </span>
                    </td>

                    <td>

                      <div className="date-cell">

                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}

                        <span>
                          {new Date(
                            item.createdAt
                          ).toLocaleTimeString(
                            [],
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </span>

                      </div>

                    </td>

                    <td>

                      <div className="history-actions">

                        <Link
                          className="view-btn"
                          to={`/details/${item._id}`}
                        >
                          <FiEye />
                          View
                        </Link>

                        <button
                          className="delete-history-btn"
                          onClick={() =>
                            handleDelete(
                              item._id
                            )
                          }
                        >
                          <FiTrash2 />
                        </button>

                      </div>

                    </td>

                  </tr>
                );
              })}

            </tbody>

          </table>

        )}

      </div>


      {/* PAGINATION */}

      {total > 0 && (
        <div className="history-pagination">

          <span>
            Showing{" "}
            {(page - 1) * limit + 1}
            {" - "}
            {Math.min(
              page * limit,
              total
            )}
            {" of "}
            {total}
          </span>

          <div className="pagination-controls">

            <button
              disabled={page <= 1}
              onClick={() =>
                setPage(
                  (prev) => prev - 1
                )
              }
            >
              <FiChevronLeft />
            </button>

            <span>
              Page {page} of{" "}
              {totalPages}
            </span>

            <button
              disabled={
                page >= totalPages
              }
              onClick={() =>
                setPage(
                  (prev) => prev + 1
                )
              }
            >
              <FiChevronRight />
            </button>

          </div>

        </div>
      )}

    </div>
  );
}