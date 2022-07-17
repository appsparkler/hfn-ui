export const LocalStorageKeys = {
  TURN_ON_SCANNER: "isOnScanner",
  MODE: "mode",
  OFFLINE_MODE: "isOfflineMode",
  DEVICE_ID: "deviceId",
};

export const removeScannerOnKey = () => {
  localStorage.removeItem(LocalStorageKeys.TURN_ON_SCANNER);
};

export const setScannerOnKey = () => {
  localStorage.setItem(LocalStorageKeys.TURN_ON_SCANNER, "true");
};
