import { contextBridge, ipcRenderer } from "electron";

import IPC_MAIN_CHANNELS from "../ipc/mainChannels";
import IPC_MAIN_EVENTS from "../ipc/mainEvents";
import IPC_RENDERER_LISTENERS from "../ipc/rendererListeners";

const ipcSend = (eventString, ...eventParams) => {
  if (!IPC_MAIN_EVENTS.hasOwnProperty(eventString)) {
    throw new Error("Invalid Event String");
  }
  return ipcRenderer.send(eventString, ...eventParams);
};

const ipcInvoke = (channelString, ...channelParams) => {
  if (!IPC_MAIN_CHANNELS.hasOwnProperty(channelString)) {
    throw new Error("Invalid Channel String");
  }
  return ipcRenderer.invoke(channelString, ...channelParams);
};

try {
  contextBridge.exposeInMainWorld(
    "__ELECTRON__",
    Object.freeze({
      ipcSend,
      ipcInvoke,
    })
  );
} catch (error) {
  console.error("ERROR: __ELECTRON__[ContextBridge]");
}

try {
  window.addEventListener("DOMContentLoaded", () => {
    IPC_RENDERER_LISTENERS.forEach(([eventName, listener]) => {
      if (typeof listener === "function") {
        ipcRenderer.on(eventName, listener);
      }
    });
  });
} catch (error) {
  console.error("ERROR: IPC_RENDERER_LISTENERS");
}
