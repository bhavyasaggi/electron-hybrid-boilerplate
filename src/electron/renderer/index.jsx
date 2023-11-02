import React from "react";
import ReactDOM from "react-dom/client";

import isDev from "../../utils/isDev";

function render({ default: App }) {
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(<App />);
}

if (isDev || MAIN_WINDOW_BUILD_MODE === "app") {
  import("../../app").then(render);
} else {
  import("./splash").then(render);
}

function ipcNonce(...args) {
  console.debug("__ELECTRON__ not available for: ", ...args);
  return;
}

window.__ELECTRON__ = window.__ELECTRON__ || {
  ipcSend: ipcNonce,
  ipcInvoke: ipcNonce,
};
window.addEventListener("unhandled-error", console.error);
