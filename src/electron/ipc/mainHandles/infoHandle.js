import {
  nativeTheme,
  net,
  netLog,
  powerMonitor,
  screen,
  systemPreferences,
} from "electron";

const appPathKeys = [
  "home",
  "appData",
  "userData",
  "sessionData",
  "temp",
  "exe",
  "module",
  "desktop",
  "documents",
  "downloads",
  "music",
  "pictures",
  "videos",
  // "recent",
  "logs",
  // "crashDump",
];
const getAppPaths = (app) =>
  appPathKeys.reduce((acc, key) => {
    acc[key] = app.getPath(key);
    return acc;
  }, {});

export default async function infoHandle(_app, _browserWindow, event) {
  const {
    defaultApp,
    windowsStore,
    resourcesPath,
    sandboxed,
    contextIsolated,
    versions,
  } = process;

  const systemVersion = process.getSystemVersion();
  const cpuUsage = process.getCPUUsage();
  const memoryUsage = process.getSystemMemoryInfo();
  const ioUsage = process.getIOCounters();
  const heapUsage = process.getHeapStatistics();

  const { name, isPackaged, userAgentFallback } = _app;
  const appIsReady = _app.isReady();
  const appName = _app.getName();
  const appVersion = _app.getVersion();
  const appLocale = _app.getLocale();
  const appSystemLocale = _app.getSystemLocale();
  const appMetrics = _app.getAppMetrics();
  const appPaths = getAppPaths(_app);

  const isOffscreen = _browserWindow.webContents.isOffscreen();
  const osProcessId = _browserWindow.webContents.getOSProcessId();
  const processId = _browserWindow.webContents.getProcessId();
  const { audioMuted, userAgent, zoomLevel, zoomFactor, frameRate } =
    _browserWindow.webContents;

  const { useDarkColors, useHighContrastColors, useInvertedColorScheme } =
    nativeTheme;

  const animationSettings = systemPreferences.getAnimationSettings();

  const netOnline = net.isOnline();
  const netLogging = netLog.currentlyLogging;
  const onBatteryPower = powerMonitor.isOnBatteryPower();
  const systemIdleState = powerMonitor.getSystemIdleState(10);
  const systemIdleTime = powerMonitor.getSystemIdleTime();

  const displays = screen.getAllDisplays();
  const primaryDisplay = screen.getPrimaryDisplay();
  const activeDisplay = screen.getDisplayNearestPoint(
    screen.getCursorScreenPoint()
  );

  return {
    defaultApp,
    windowsStore,
    resourcesPath,
    sandboxed,
    contextIsolated,
    versions,
    systemVersion,
    cpuUsage,
    memoryUsage,
    ioUsage,
    heapUsage,
    name,
    isPackaged,
    userAgentFallback,
    appIsReady,
    appName,
    appVersion,
    appLocale,
    appSystemLocale,
    appMetrics,
    appPaths,
    isOffscreen,
    osProcessId,
    processId,
    audioMuted,
    userAgent,
    zoomLevel,
    zoomFactor,
    frameRate,
    useDarkColors,
    useHighContrastColors,
    useInvertedColorScheme,
    animationSettings,
    netOnline,
    netLogging,
    onBatteryPower,
    systemIdleState,
    systemIdleTime,
    displays,
    primaryDisplay,
    activeDisplay,
  };
}
