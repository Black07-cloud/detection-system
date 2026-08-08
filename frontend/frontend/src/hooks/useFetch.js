import { useState, useEffect } from "react";
import api from "../services/api";

export default function useFetch(path) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    api
      .get(path)
      .then((res) => {
        if (!mounted) return;

        // History list
        if (path === "/history") {
          setData(res.data.data);
        }
        // History by ID
        else if (path.startsWith("/history/")) {
          setData(res.data.data);
        }
        // Statistics and any other APIs
        else {
          setData(res.data);
        }
      })
      .catch((err) => {
        if (mounted) setError(err);
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [path]);

  return { data, loading, error };
}