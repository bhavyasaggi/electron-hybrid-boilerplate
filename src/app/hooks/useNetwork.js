import React, { useEffect } from "react";

import useOnline from "./useOnline";
import usePrevious from "./usePrevious";

const noop = () => {};

export default function useNetwork(onOnline = noop, onOffline = noop) {
  const isOnline = useOnline();
  const isPrevOnline = usePrevious(isOnline);

  const status = 2 * (isOnline ? 1 : 0) + (isPrevOnline ? 1 : 0);

  useEffect(() => {
    switch (status) {
      // Staying Offline
      case 0:
        break;
      // Went Offline
      case 1:
        onOffline()
        break;
      // Came Online
      case 2:
        onOnline()
        break;
      // Staying Online
      case 3:
        break;
      // Invalid
      default:
        break;
    }
  }, [status, onOnline, onOffline]);

  return status

}