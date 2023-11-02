import React from "react";

import IPC_MAIN_EVENTS from "../../../electron/ipc/mainEvents";

export default function ErrorRoute({ code, message }) {
  return (
    <div>
      <pre>
        ERROR: {code} : {message}
      </pre>
      <button
        type="button"
        onClick={() => {
          window.__ELECTRON__.ipcSend(IPC_MAIN_EVENTS.MAIN_APP_RESET);
        }}
      >
        Reload
      </button>
    </div>
  );
}
