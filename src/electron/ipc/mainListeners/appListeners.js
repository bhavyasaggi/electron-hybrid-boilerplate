import { customControls } from "../../middlewares/customControls";

export async function mainAppReloadListener(_app, _browserWindow, event) {
  await customControls.reloadMainWindow();
}

export async function mainAppRefreshListener(_app, _browserWindow, event) {
  await customControls.refreshMainWindow();
}

export async function mainAppResetListener(_app, _browserWindow, event) {
  await customControls.resetMain();
}

export default {
  mainAppReloadListener,
  mainAppResetListener,
};
