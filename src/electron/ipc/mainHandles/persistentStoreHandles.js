import merge from "lodash/merge";
import cloneDeep from "lodash/cloneDeep";
import toPlainObject from "lodash/toPlainObject";

import { persistentStore } from "../../main/store";

export function persistentStoreGet(app, browserWindow, event, key) {
  return persistentStore.get(key);
}

export function persistentStoreSet(app, browserWindow, event, value = {}) {
  persistentStore.set(value);
  return value;
}

export function persistentStoreMerge(app, browserWindow, event, value = {}) {
  return cloneDeep(merge(persistentStore.store, value));
}

export function persistentStoreDelete(app, browserWindow, event, key) {
  const preValue = persistentStore.get(key);
  persistentStore.delete(key);
  return preValue;
}

export function persistentStoreClear(app, browserWindow, event, ...params) {
  persistentStore.clear();
  return toPlainObject(persistentStore.store);
}

export function persistentStoreDump(app, browserWindow, event, ...params) {
  return toPlainObject(persistentStore.store);
}

export default {
  persistentStoreGet,
  persistentStoreSet,
  persistentStoreMerge,
  persistentStoreDelete,
  persistentStoreClear,
  persistentStoreDump,
};
