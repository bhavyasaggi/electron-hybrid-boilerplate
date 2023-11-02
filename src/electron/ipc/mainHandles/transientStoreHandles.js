import { transientStore } from "../../main/store";

export function transientStoreGet(app, browserWindow, event, key) {
  return transientStore.get(key);
}

export function transientStoreSet(app, browserWindow, event, value = {}) {
  return transientStore.set(value);
}

export function transientStoreMerge(app, browserWindow, event, value = {}) {
  return transientStore.merge(value);
}

export function transientStoreDelete(app, browserWindow, event, key) {
  transientStore.delete(key);
}

export function transientStoreClear(app, browserWindow, event) {
  transientStore.clear();
}

export function transientStoreDump(app, browserWindow, event) {
  return transientStore.dump();
}

export default {
  transientStoreGet,
  transientStoreSet,
  transientStoreMerge,
  transientStoreDelete,
  transientStoreClear,
  transientStoreDump,
};
