import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch, FiX } from "react-icons/fi";

import "../styles/navbar.css";

export default function Navbar() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const value = query.trim();

    if (!value) {
      navigate("/history");
      return;
    }

    navigate(
      `/history?search=${encodeURIComponent(value)}`
    );
  };

  const clearSearch = () => {
    setQuery("");
    navigate("/history");
  };

  return (
    <header className="navbar">

      <form
        className="search-box"
        onSubmit={handleSearch}
      >
        <FiSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search animals..."
          value={query}
          onChange={(e) =>
            setQuery(e.target.value)
          }
        />

        {query && (
          <button
            type="button"
            className="search-clear"
            onClick={clearSearch}
          >
            <FiX />
          </button>
        )}
      </form>

      <div className="navbar-right">
        {/* Other navbar buttons */}
      </div>

    </header>
  );
}