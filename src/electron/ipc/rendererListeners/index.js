import IPC_RENDERER_EVENTS from "../rendererEvents";

const IPC_RENDERER_LISTENERS = [];

IPC_RENDERER_LISTENERS.push([
  IPC_RENDERER_EVENTS.SET_COOKIE,
  (event, value) => {
    return { event, value };
  },
]);

IPC_RENDERER_LISTENERS.push([
  IPC_RENDERER_EVENTS.WEB_LOG,
  (event, type = "log", ...value) => {
    try {
      console[type](...value);
    } catch (error) {
      console.error(error);
    }

    return;
  },
]);

IPC_RENDERER_LISTENERS.push([
  IPC_RENDERER_EVENTS.WEB_CUSTOM_EVENT,
  (event, type = "customevent", detail) => {
    const customEvent = new CustomEvent(type, { detail });
    window.dispatchEvent(customEvent);
  },
]);

export default IPC_RENDERER_LISTENERS;
