import qs from "query-string";
import React, { memo, useCallback, useEffect, useState } from "react";

import ErrorRouteRaw from "./Error";
import LoadingRouteRaw from "./Loading";
import OfflineRouteRaw from "./Offline";

import useNetwork from "../hooks/useNetwork";

import IPC_RENDERER_CUSTOM_EVENTS from "../../electron/ipc/customEvents";
import IPC_MAIN_EVENTS from "../../electron/ipc/mainEvents";
import IPC_MAIN_CHANNELS from "../../electron/ipc/mainChannels";

const ErrorRoute = memo(ErrorRouteRaw);
const LoadingRoute = memo(LoadingRouteRaw);
const OfflineRoute = memo(OfflineRouteRaw);

export default function Route() {
  const [{ code, message }, setStatus] = useState({
    code: 0,
    message: "Initializing ...",
  });

  useNetwork(
    () => {
      window.__ELECTRON__.ipcSend(IPC_MAIN_EVENTS.MAIN_APP_RELOAD);
    },
    () => {
      setStatus({
        code: 1,
        message: "Offline",
      });
    }
  );

  const preCheck = useCallback(async () => {
    const statusObj = {
      code: 0,
      message: "Loading",
    };
    return statusObj;
  }, []);

  useEffect(() => {
    preCheck().then(({ code: checkCode, message: checkMessage }) => {
      if (checkCode < 0) {
        setStatus({ code: checkCode, message: checkMessage });
      } else {
        setStatus({ code: 2, message: 'Success' });
      }
    });
  }, []);

  useEffect(() => {
    const protocolListener = async (event) => {
      window.__ELECTRON__.ipcSend(IPC_MAIN_EVENTS.MAIN_APP_RELOAD);
    };
    window.addEventListener(
      IPC_RENDERER_CUSTOM_EVENTS.PROTOCOL_URL,
      protocolListener
    );
    return () => {
      window.removeEventListener(
        IPC_RENDERER_CUSTOM_EVENTS.PROTOCOL_URL,
        protocolListener
      );
    };
  }, []);

  let Component = null;
  switch (code) {
    case -1:
      Component = OfflineRoute;
      break;
    case 0:
      Component = LoadingRoute;
      break;
    case 1:
      Component = OfflineRoute;
      break;
    case 2:
      // Add Custom Component here
      Component = ()=>"Success!!";
      break;
    default:
      Component = ErrorRoute;
      break;
  }

  return <Component code={code} message={message} />;
}
