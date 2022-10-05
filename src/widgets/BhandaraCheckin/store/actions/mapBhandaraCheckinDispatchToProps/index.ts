import { Dispatch } from "@reduxjs/toolkit";
import { HOME } from "widgets/BhandaraCheckin/routing/actions/page";
import { BhandaraCheckinDispatchProps } from "widgets/BhandaraCheckin/types";
import {
  getAppVersionNumber,
  signOutAnonymously,
  signInAnonymously,
} from "widgets/BhandaraCheckin/store/api-async-thunks";

import {
  appUpdaterActions,
  bhandaraCheckinActions,
  snackbarActions,
} from "../../slices";
import { refreshApp } from "../utils";

export const mapBhandaraCheckinDispatchToProps = (
  dispatch: Dispatch
): BhandaraCheckinDispatchProps => ({
  onMount: async () => {
    if (navigator.onLine) {
      await dispatch<any>(signInAnonymously());
      const appVersionNumberInLocalStorage: number =
        getAppVersionNumberFromLocalStorage();
      const response = await dispatch<any>(getAppVersionNumber());
      if (response.meta.requestStatus === "fulfilled") {
        const appVersionNumberOnApi = Number(response.payload);
        if (appVersionNumberOnApi > appVersionNumberInLocalStorage) {
          setAppVersionNumberOnLocalStorage(appVersionNumberOnApi);
          dispatch(appUpdaterActions.updatingApp());
          setTimeout(async () => {
            await refreshApp(dispatch);
            dispatch(bhandaraCheckinActions.renderApp());
          }, 1000);
        } else {
          dispatch(appUpdaterActions.appIsUpdated());
          setTimeout(() => {
            dispatch(bhandaraCheckinActions.renderApp());
            dispatch(HOME());
          }, 1000);
        }
      }
    } else {
      dispatch(
        snackbarActions.openSnackbar({
          children:
            "The app on your device may be outdated due to which your entries might not get checked in.  Please connect to the internet and refresh the app.",
          severity: "warning",
          autoHideDuration: 10000,
        })
      );
      dispatch(bhandaraCheckinActions.renderApp());
    }
  },
  onUnmount: () => {
    dispatch<any>(signOutAnonymously());
  },
});

function setAppVersionNumberOnLocalStorage(appVersionNumber: number) {
  window.localStorage.setItem("appVersion", appVersionNumber.toString());
}

function getAppVersionNumberFromLocalStorage(): number {
  const appVersion = window.localStorage.getItem("appVersion");
  const appVersionNumber = Number(appVersion);
  return appVersionNumber;
}
