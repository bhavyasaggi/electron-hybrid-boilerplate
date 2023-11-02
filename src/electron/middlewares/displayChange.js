import electron from "electron";

import logger from "../main/logger";

import IPC_RENDERER_EVENTS from "../ipc/rendererEvents";
import IPC_RENDERER_CUSTOM_EVENTS from "../ipc/customEvents";

export default function displayChangeMiddleware(app, browserWindows) {
  const displayChangeAction = (event, display) => {
    const mainBrowserWindow = browserWindows.main;
    if (!mainBrowserWindow) {
      return null;
    }
    const displayCount = electron.screen.getAllDisplays().length;
    logger.warn(`Number of displays changed to ${displayCount}`);
    mainBrowserWindow.webContents.send(
      IPC_RENDERER_EVENTS.WEB_CUSTOM_EVENT,
      IPC_RENDERER_CUSTOM_EVENTS.SCREEN_CHANGE
    );
  };

  app.on("ready", () => {
    electron.screen.on("display-added", displayChangeAction);
    electron.screen.on("display-removed", displayChangeAction);
    // electron.screen.on('display-metrics-changed', displayChangeAction)
  });
}
