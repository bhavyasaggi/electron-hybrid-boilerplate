import { desktopCapturer } from "electron";

export default async function desktopSourcesHandle(
  _app,
  _browserWindow,
  event,
  desktopCapturerSourcesTypes = []
) {
  const desktopCapturerSources = await desktopCapturer.getSources({
    types: desktopCapturerSourcesTypes,
  });

  return desktopCapturerSources
    .map(({ id, name, display_id: displayId }) => ({ id, name, displayId }))
    .sort(({ id: a }, { id: b }) => {
      if (a === b) {
        return 0;
      }
      if (a > b) {
        return 1;
      }
      return -1;
    });
}
