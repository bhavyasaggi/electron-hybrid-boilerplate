import { dialog } from "electron";

import logger from "../main/logger";

export default function windowCloseMiddleware(app, browserWindows) {
  app.on("browser-window-created", (event, currentBrowserWindow) => {
    currentBrowserWindow.on("close", (e) => {
      e.preventDefault();
      dialog
        .showMessageBox({
          type: "info",
          buttons: ["Yes", "Cancel"],
          title: "Warning",
          message:
            "This app is required to be running always. Are you sure you want to close it?",
        })
        .then(({ response }) => {
          if (response === 0) {
            logger.info("User pressed 'Yes' to quit application");
            currentBrowserWindow.destroy();
            app.quit();
          } else {
            logger.info("User pressed 'Cancel' to stay in application");
          }
        });
    });

    currentBrowserWindow.on("closed", () => {
      browserWindows.main = null;
    });
  });
}
