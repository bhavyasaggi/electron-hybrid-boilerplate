import path from "node:path";

import { protocolClient } from "../../../package.json";

export default function protocolClientMiddleware(app, browserWindows) {
  // Register Protocol Client
  if (process.defaultApp) {
    if (process.argv.length >= 2) {
      app.setAsDefaultProtocolClient(protocolClient, process.execPath, [
        path.resolve(process.argv[1]),
      ]);
    }
  } else {
    app.setAsDefaultProtocolClient(protocolClient);
  }
}
