import logger from "../main/logger";

import { customControls } from "./customControls";

export default function secondInstanceMiddleware(app, browserWindows) {
  // Single Instance only
  const instanceLock = app.requestSingleInstanceLock();
  if (!instanceLock) {
    app.quit();
  }
  app.on("second-instance", async (e, argv) => {
    if (process.platform === "win32") {
      const deeplinkingUrl = argv.slice(1);
      const url = deeplinkingUrl.find((url) => url.includes(protocolClient));
      logger.debug(`Window callback`, { deeplinkingUrl });
      await customControls.loadMainWindow(url);
    }
    const mainWindow = browserWindows.main;
    if (mainWindow) {
      mainWindow.restore();
      mainWindow.focus();
    } else {
      await customControls.loadMainWindow();
    }
  });
}
