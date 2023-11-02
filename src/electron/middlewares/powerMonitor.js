import { powerMonitor } from "electron";

import logger from "../main/logger";

import { customControls } from "./customControls";

export default function powerMonitorMiddleware(app, browserWindows) {
  app.allowRendererProcessReuse = true;
  powerMonitor.on("unlock-screen", async () => {
    logger.debug("Screen unlocked");
    await customControls.reloadMainWindow();
  });
  powerMonitor.on("resume", async () => {
    logger.debug("System resuming");
    await customControls.reloadMainWindow();
  });
}
