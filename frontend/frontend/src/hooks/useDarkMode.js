import { useState, useEffect } from "react";

export default function useDarkMode() {
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem("wildguard-dark");
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("wildguard-dark", JSON.stringify(dark));

    if (dark) {
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
    }
  }, [dark]);

  return {
    dark,
    toggle: () => setDark((prev) => !prev),
  };
}