import { systemPreferences } from "electron";

import {
  persistentStoreGet,
  persistentStoreSet,
  persistentStoreMerge,
  persistentStoreDelete,
  persistentStoreClear,
  persistentStoreDump,
} from "./persistentStoreHandles";
import {
  transientStoreGet,
  transientStoreSet,
  transientStoreMerge,
  transientStoreDelete,
  transientStoreClear,
  transientStoreDump,
} from "./transientStoreHandles";

import fetchHandle from "./fetchHandle";
import infoHandle from "./infoHandle";
import desktopSourcesHandle from "./desktopSourcesHandle";

import IPC_MAIN_CHANNELS from "../mainChannels";

const IPC_MAIN_HANDLES = [];

IPC_MAIN_HANDLES.push([IPC_MAIN_CHANNELS.MAIN_FETCH_SYNC, fetchHandle]);

IPC_MAIN_HANDLES.push([IPC_MAIN_CHANNELS.MAIN_GET_INFO, infoHandle]);
IPC_MAIN_HANDLES.push([
  IPC_MAIN_CHANNELS.MAIN_GET_DESKTOP_SOURCES,
  desktopSourcesHandle,
]);

IPC_MAIN_HANDLES.push([
  IPC_MAIN_CHANNELS.MAIN_PERMISSION_STATUS,
  (_app, _browserWindow, event, { mediaAccessType = "" } = {}) => {
    // not-determined, granted, denied, restricted, unknown
    return systemPreferences.getMediaAccessStatus(mediaAccessType);
  },
]);

IPC_MAIN_HANDLES.push([
  IPC_MAIN_CHANNELS.MAIN_PERSISTENT_STORE_GET,
  persistentStoreGet,
]);
IPC_MAIN_HANDLES.push([
  IPC_MAIN_CHANNELS.MAIN_PERSISTENT_STORE_SET,
  persistentStoreSet,
]);
IPC_MAIN_HANDLES.push([
  IPC_MAIN_CHANNELS.MAIN_PERSISTENT_STORE_MERGE,
  persistentStoreMerge,
]);
IPC_MAIN_HANDLES.push([
  IPC_MAIN_CHANNELS.MAIN_PERSISTENT_STORE_DELETE,
  persistentStoreDelete,
]);
IPC_MAIN_HANDLES.push([
  IPC_MAIN_CHANNELS.MAIN_PERSISTENT_STORE_CLEAR,
  persistentStoreClear,
]);
IPC_MAIN_HANDLES.push([
  IPC_MAIN_CHANNELS.MAIN_PERSISTENT_STORE_DUMP,
  persistentStoreDump,
]);

IPC_MAIN_HANDLES.push([
  IPC_MAIN_CHANNELS.MAIN_TRANSIENT_STORE_GET,
  transientStoreGet,
]);
IPC_MAIN_HANDLES.push([
  IPC_MAIN_CHANNELS.MAIN_TRANSIENT_STORE_SET,
  transientStoreSet,
]);
IPC_MAIN_HANDLES.push([
  IPC_MAIN_CHANNELS.MAIN_TRANSIENT_STORE_MERGE,
  transientStoreMerge,
]);
IPC_MAIN_HANDLES.push([
  IPC_MAIN_CHANNELS.MAIN_TRANSIENT_STORE_DELETE,
  transientStoreDelete,
]);
IPC_MAIN_HANDLES.push([
  IPC_MAIN_CHANNELS.MAIN_TRANSIENT_STORE_CLEAR,
  transientStoreClear,
]);
IPC_MAIN_HANDLES.push([
  IPC_MAIN_CHANNELS.MAIN_TRANSIENT_STORE_DUMP,
  transientStoreDump,
]);

export default IPC_MAIN_HANDLES;
