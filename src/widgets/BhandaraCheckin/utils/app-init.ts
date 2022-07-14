import { v4 as uuid } from "uuid";
import { LocalStorageKeys } from "../constants";

function setDeviceId() {
  const deviceId = localStorage.getItem(LocalStorageKeys.DEVICE_ID);
  if (!deviceId) {
    localStorage.setItem(LocalStorageKeys.DEVICE_ID, uuid());
  }
}

export const init = () => {
  setDeviceId();
};
