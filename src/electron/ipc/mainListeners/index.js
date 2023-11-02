import logListener from "./logListener";

import {
  mainAppReloadListener,
  mainAppRefreshListener,
  mainAppResetListener,
} from "./appListeners";

import IPC_MAIN_EVENTS from "../mainEvents";

const IPC_MAIN_LISTENERS = [];

IPC_MAIN_LISTENERS.push([IPC_MAIN_EVENTS.MAIN_LOG, logListener]);

IPC_MAIN_LISTENERS.push([
  IPC_MAIN_EVENTS.MAIN_APP_RELOAD,
  mainAppReloadListener,
]);

IPC_MAIN_LISTENERS.push([
  IPC_MAIN_EVENTS.MAIN_APP_REFRESH,
  mainAppRefreshListener,
]);

IPC_MAIN_LISTENERS.push([IPC_MAIN_EVENTS.MAIN_APP_RESET, mainAppResetListener]);

export default IPC_MAIN_LISTENERS;
