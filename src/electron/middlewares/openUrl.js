import logger from "../main/logger";

import { customControls } from "./customControls";

import { protocolClient } from "../../../package.json";

import IPC_RENDERER_EVENTS from "../ipc/rendererEvents";
import IPC_RENDERER_CUSTOM_EVENTS from "../ipc/customEvents";

export default function openUrlMiddleware(app, browserWindows) {
  app.on("open-url", async (event, url) => {
    logger.debug("'open-url' callback received", { event, url });
    const { protocol } = new URL(url);
    if (protocol.includes(protocolClient)) {
      // Open Main Url on protocolClient
      event.preventDefault();
      await customControls.loadMainWindow();
      const mainBrowserWindow = browserWindows.main;
      mainBrowserWindow.once("ready-to-show", () => {
        mainBrowserWindow.webContents.send(
          IPC_RENDERER_EVENTS.WEB_CUSTOM_EVENT,
          IPC_RENDERER_CUSTOM_EVENTS.PROTOCOL_URL,
          {
            url,
          }
        );
      });
    }
  });
}
