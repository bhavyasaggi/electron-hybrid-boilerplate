import { powerSaveBlocker } from "electron";

import { transientStore } from "../main/store";

export default function powerSaveBlockerMiddleware(app, browserWindows) {
  app.on("ready", () => {
    const powerSaveBlockerId = transientStore.get("powerSaveBlockerId");
    if (powerSaveBlockerId) {
      powerSaveBlocker.stop(powerSaveBlockerId);
    }
    const newPowerSaveBlockerId = powerSaveBlocker.start(
      "prevent-app-suspension"
    );
    transientStore.set({ powerSaveBlockerId: newPowerSaveBlockerId });
  });
  app.on("quit", () => {
    const powerSaveBlockerId = transientStore.get("powerSaveBlockerId");
    if (powerSaveBlockerId) {
      powerSaveBlocker.stop(powerSaveBlockerId);
    }
  });
}
