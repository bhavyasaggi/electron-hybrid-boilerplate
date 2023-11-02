import React, { useEffect, useState } from "react";
import Spinner from "./components/Spinner";

import Route from "./routes";

export default function App() {
  const [isRouteLoading, setIsRouteLoading] = useState(false);

  useEffect(() => {
    const loadCb = () => {
      setIsRouteLoading(false);
    };
    window.addEventListener("load", loadCb);
    return () => {
      window.removeEventListener("load", loadCb);
    };
  }, []);

  useEffect(() => {
    const unloadCb = () => {
      setIsRouteLoading(true);
    };
    window.addEventListener("unload", unloadCb);
    return () => {
      window.removeEventListener("unload", unloadCb);
    };
  }, []);

  const Component = isRouteLoading ? Spinner : Route;

  return <Component />;
}
