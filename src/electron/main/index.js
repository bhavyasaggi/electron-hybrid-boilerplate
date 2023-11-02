import path from "path";
import electron, {
  app,
  BrowserWindow,
  dialog,
  ipcMain,
  powerMonitor,
  powerSaveBlocker,
} from "electron";
import electronSquirrelStartup from "electron-squirrel-startup";

import unhandled from "electron-unhandled";

import logger from "./logger";

import controlsMiddleware, {
  customControls,
} from "../middlewares/customControls";
import displayChangeMiddleware from "../middlewares/displayChange";
import openUrlMiddleware from "../middlewares/openUrl";
import powerMonitorMiddleware from "../middlewares/powerMonitor";
import powerSaveBlockerMiddleware from "../middlewares/powerSaveBlocker";
import protocolClientMiddleware from "../middlewares/protocolClient";
import secondInstanceMiddleware from "../middlewares/secondInstance";
import windowCloseMiddleware from "../middlewares/windowClose";

import IPC_RENDERER_EVENTS from "../ipc/rendererEvents";
import IPC_RENDERER_CUSTOM_EVENTS from "../ipc/customEvents";
import IPC_MAIN_HANDLES from "../ipc/mainHandles";
import IPC_MAIN_LISTENERS from "../ipc/mainListeners";

import isDev from "../../utils/isDev";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (electronSquirrelStartup) {
  app.quit();
}

if (isDev) {
  app.commandLine.appendSwitch("ignore-certificate-errors", true);
}

// Global Windows Manager
const browserWindows = {
  main: null,
};

// Attach Middlewares
// WARNING: Order is important. Ensure no cyclic dependency.
[
  controlsMiddleware,
  openUrlMiddleware,
  powerMonitorMiddleware,
  powerSaveBlockerMiddleware,
  protocolClientMiddleware,
  secondInstanceMiddleware,
  displayChangeMiddleware,
  windowCloseMiddleware,
].forEach((middleware) => {
  middleware(app, browserWindows);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(customControls.createMainWindow);

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (
    browserWindows.main === null ||
    BrowserWindow.getAllWindows().length === 0
  ) {
    customControls.createMainWindow();
  }
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

IPC_MAIN_HANDLES.forEach(([channel, handle]) => {
  if (typeof handle === "function") {
    ipcMain.handle(channel, (...args) => {
      return handle(app, browserWindows.main, ...args);
    });
  }
});

IPC_MAIN_LISTENERS.forEach(([event, listener]) => {
  if (typeof listener === "function") {
    ipcMain.on(event, (...args) => {
      return listener(app, browserWindows.main, ...args);
    });
  }
});

unhandled({
  showDialog: false,
  logger: (error) => {
    logger.error(`Uncaught error: ${error}`, { error });
    browserWindows.main.webContents.send(
      IPC_RENDERER_EVENTS.WEB_CUSTOM_EVENT,
      IPC_RENDERER_CUSTOM_EVENTS.UNHANDLED_ERROR,
      {
        serializedError: error.toString(),
      }
    );
  },
});
