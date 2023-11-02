import { BrowserWindow } from "electron";

import logger from "../main/logger";
import { persistentStore } from "../main/store";

import isDev from "../../utils/isDev";

import { productName } from "../../../package.json";

const preloadPath = MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY;
const mainPath = MAIN_WINDOW_WEBPACK_ENTRY;

const browserWindowParams = {
  // type: "desktop",
  width: 1100,
  height: 800,
  title: productName,
  center: true,
  resizable: false,
  fullscreenable: false,
  // zoomToPageWidth: false,
  // hasShadow: false,
  // skipTaskbar: true,
  autoHideMenuBar: !isDev,
  // titleBarStyle: "hidden",
  // backgroundColor: "#2e2c29",
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    devTools: isDev,
    preload: preloadPath,
    disableHtmlFullscreenWindowResize: true,
    spellcheck: false,
  },
};

async function createMainWindow(app, browserWindows) {
  if (browserWindows.main) {
    return browserWindows.main;
  }

  const mainBrowserWindow = new BrowserWindow(browserWindowParams);

  if (isDev) {
    const {
      default: installExtension,
      REACT_DEVELOPER_TOOLS,
      REDUX_DEVTOOLS,
    } = await import("electron-devtools-installer");
    await installExtension([REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS], {
      // loadExtensionOptions: { allowFileAccess: true },
      // forceDownload: true,
    }).catch((error) => {
      logger.error(`Error loading React DevTools: ${error}`, { error });
    });
  }

  mainBrowserWindow.loadURL(mainPath);

  mainBrowserWindow.once("ready-to-show", () => {
    if (isDev) {
      mainBrowserWindow.webContents.openDevTools();
    }
  });

  browserWindows.main = mainBrowserWindow;
}

async function loadMainWindow(app, browserWindows, url = mainPath) {
  if (!browserWindows.main) {
    await createMainWindow(app, browserWindows);
    return;
  }
  browserWindows.main.loadURL(url);
}

async function reloadMainWindow(app, browserWindows) {
  logger.debug("Reloading app...");
  if (browserWindows.main) {
    browserWindows.main.reload();
  } else {
    await createMainWindow(app, browserWindows);
  }
}

async function refreshMainWindow(app, browserWindows) {
  logger.debug("Refreshing app...");
  if (browserWindows.main) {
    browserWindows.main.loadURL(mainPath);
  } else {
    await createMainWindow(app, browserWindows);
  }
}

async function resetMain(app, browserWindows) {
  logger.debug("Resetting app...");
  persistentStore.clear();
  if (browserWindows.main) {
    browserWindows.main.loadURL(mainPath);
  } else {
    await createMainWindow(app, browserWindows);
  }
}

export const customControls = (() => {
  let app = null;
  let browserWindow = null;
  const preCheck = () => {
    const validCheck = Boolean(app && browserWindow);
    if (!validCheck) {
      throw new Error("Initialize Middleware.");
    }
    return validCheck;
  };
  return Object.freeze(
    Object.defineProperties(
      {},
      {
        init: {
          value: (appRef, browserWindowRef) => {
            if (!appRef || !browserWindowRef) {
              throw new Error("Invalid params for initialization.");
            }
            if (app && browserWindow) {
              throw new Error("Already Initialized");
            }
            app = appRef;
            browserWindow = browserWindowRef;
          },
        },
        createMainWindow: {
          value: (...restArgs) => {
            preCheck();
            return createMainWindow(app, browserWindow, ...restArgs);
          },
        },
        loadMainWindow: {
          value: (...restArgs) => {
            preCheck();
            return loadMainWindow(app, browserWindow, ...restArgs);
          },
        },
        reloadMainWindow: {
          value: (...restArgs) => {
            preCheck();
            return reloadMainWindow(app, browserWindow, ...restArgs);
          },
        },
        refreshMainWindow: {
          value: (...restArgs) => {
            preCheck();
            return refreshMainWindow(app, browserWindow, ...restArgs);
          },
        },
        resetMain: {
          value: (...restArgs) => {
            preCheck();
            return resetMain(app, browserWindow, ...restArgs);
          },
        },
      }
    )
  );
})();

export default function controlsMiddleware(appRef, browserWindowsRef) {
  customControls.init(appRef, browserWindowsRef);
}
