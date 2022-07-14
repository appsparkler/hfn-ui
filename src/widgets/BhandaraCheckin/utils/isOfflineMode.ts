import { LocalStorageKeys } from "../constants";

export const isOfflineMode = () =>
  Boolean(localStorage.getItem(LocalStorageKeys.OFFLINE_MODE));
