const IPC_MAIN_CHANNELS = Object.freeze({
  MAIN_GET_INFO: "MAIN_GET_INFO",
  MAIN_GET_DESKTOP_SOURCES: "MAIN_GET_DESKTOP_SOURCES",
  MAIN_PERMISSION_STATUS: "MAIN_PERMISSION_STATUS",
  // NODE FETCH
  MAIN_FETCH_SYNC: "MAIN_FETCH_SYNC",
  // TRANSIENT STORE EVENTS
  MAIN_TRANSIENT_STORE_GET: "MAIN_TRANSIENT_STORE_GET",
  MAIN_TRANSIENT_STORE_SET: "MAIN_TRANSIENT_STORE_SET",
  MAIN_TRANSIENT_STORE_MERGE: "MAIN_TRANSIENT_STORE_MERGE",
  MAIN_TRANSIENT_STORE_DELETE: "MAIN_TRANSIENT_STORE_DELETE",
  MAIN_TRANSIENT_STORE_CLEAR: "MAIN_TRANSIENT_STORE_CLEAR",
  MAIN_TRANSIENT_STORE_DUMP: "MAIN_TRANSIENT_STORE_DUMP",
  // PERSISTENT STORE EVENTS
  MAIN_PERSISTENT_STORE_GET: "MAIN_PERSISTENT_STORE_GET",
  MAIN_PERSISTENT_STORE_SET: "MAIN_PERSISTENT_STORE_SET",
  MAIN_PERSISTENT_STORE_MERGE: "MAIN_PERSISTENT_STORE_MERGE",
  MAIN_PERSISTENT_STORE_DELETE: "MAIN_PERSISTENT_STORE_DELETE",
  MAIN_PERSISTENT_STORE_CLEAR: "MAIN_PERSISTENT_STORE_CLEAR",
  MAIN_PERSISTENT_STORE_DUMP: "MAIN_PERSISTENT_STORE_DUMP",
});

export default IPC_MAIN_CHANNELS;
