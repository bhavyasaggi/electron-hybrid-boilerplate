import React, { useEffect, useState } from "react";

export default function useOnline(defaultValue) {
  const [isOnline, setOnline] = useState(() =>
    typeof defaultValue === "undefined" && typeof navigator !== "undefined"
      ? navigator.onLine
      : defaultValue
  );

  // Update Status on network change
  useEffect(() => {
    const updateOnline = () => {
      setOnline(navigator.onLine);
    };
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    return () => {
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
    };
  }, []);

  return isOnline;
}