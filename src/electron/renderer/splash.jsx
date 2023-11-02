import fetch from "cross-fetch";
import React, { useEffect, useState } from "react";

const REMOTE_WEB = process.env.REMOTE_WEB;

export default function Splash() {
  const [connected, setConnected] = useState(-1);

  useEffect(() => {
    fetch(REMOTE_WEB)
      .then(({ ok }) => {
        setConnected(ok ? 1 : 0);
      })
      .catch((error) => {
        console.error(error);
        setConnected(0);
      });
  }, []);

  useEffect(() => {
    if (connected === 1) {
      window.location.href = REMOTE_WEB;
    }
  }, [connected]);

  if (connected === 0) {
    return "No Connection Found.";
  }
  if (connected === 1) {
    return "Loading Application...";
  }
  return "Checking Connection...";
}
