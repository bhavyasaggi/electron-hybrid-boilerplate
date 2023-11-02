import React from "react";

import IPC_MAIN_EVENTS from "../../../electron/ipc/mainEvents";

export default function OfflineRoute({ code, message }) {
  return (
    <div>
      <pre>You are Offline.</pre>
      <button
        type="button"
        onClick={() => {
          window.__ELECTRON__.ipcSend(IPC_MAIN_EVENTS.MAIN_APP_RELOAD);
        }}
      >
        Reload
      </button>
    </div>
  );
}
