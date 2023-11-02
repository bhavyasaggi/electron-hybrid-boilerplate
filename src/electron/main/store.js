import merge from "lodash/merge";
import cloneDeep from "lodash/cloneDeep";
import ElectronStore from "electron-store";

export const persistentStore = new ElectronStore({
  clearInvalidConfig: true,
  defaults: {
    agentId: "",
    extEmpId: "",
    name: "",
    email: "",
    authToken: "",
    refreshToken: "",
    tenant: "",
  },
});

export const transientStore = (() => {
  const innerStore = {};
  const store = Object.freeze({
    get: (key) => cloneDeep(innerStore[key]),
    set: (value = {}) => {
      for (const key in value) {
        if (value.hasOwnProperty(key)) {
          innerStore[key] = cloneDeep(value[key]);
        }
      }
    },
    merge: (delta) => cloneDeep(merge(innerStore, delta || {})),
    delete: (key) => {
      delete innerStore[key];
    },
    clear: () => {
      for (const key in innerStore) {
        if (innerStore.hasOwnProperty(key)) {
          delete innerStore[key];
        }
      }
    },
    dump: () => cloneDeep(innerStore),
  });
  return store;
})();

const store = Object.freeze({
  persistentStore,
  transientStore,
});

export default store;
