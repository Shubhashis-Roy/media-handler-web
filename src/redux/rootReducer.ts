"use client";

import { combineReducers } from "redux";
// import { persistReducer } from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
// slices
import theme from "./slices/theme";

// -----------------------------------------
// Root Reducer
// -----------------------------------------

const createNoopStorage = () => ({
  getItem() {
    return Promise.resolve(null);
  },
  setItem(_key: string, value: string) {
    return Promise.resolve(value);
  },
  removeItem() {
    return Promise.resolve();
  },
});

const storage =
  typeof window !== "undefined"
    ? createWebStorage("local")
    : createNoopStorage();

const rootPersistConfig = {
  key: "root",
  storage,
  keyPrefix: "redux-",
  blacklist: ["feed", "connection", "request", "chat"],
  // whitelist: [],
};

const rootReducer = combineReducers({
  theme: theme,
});

export { rootPersistConfig, rootReducer };
