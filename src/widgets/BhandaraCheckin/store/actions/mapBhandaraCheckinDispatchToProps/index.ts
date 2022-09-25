import { Dispatch } from "@reduxjs/toolkit";
import { noop } from "lodash/fp";
import { HOME } from "widgets/BhandaraCheckin/routing/actions/page";
import { BhandaraCheckinDispatchProps } from "widgets/BhandaraCheckin/types";
import { getAppVersionNumber } from "../../api-async-thunks";
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
      const appVersionNumberInLocalStorage: number =
        getAppVersionNumberFromLocalStorage();
      const response = await dispatch<any>(getAppVersionNumber());
      if (response.meta.requestStatus === "fulfilled") {
        const appVersionNumberOnApi = Number(response.payload);
        if (appVersionNumberOnApi > appVersionNumberInLocalStorage) {
          setAppVersionNumberOnLocalStorage(appVersionNumberOnApi);
          dispatch(bhandaraCheckinActions.renderApp());
          await refreshApp(dispatch);
        } else {
          dispatch(appUpdaterActions.appIsUpdated());
          dispatch(bhandaraCheckinActions.renderApp());
          dispatch(HOME());
        }
      }
    } else {
      dispatch(
        snackbarActions.openSnackbar({
          children: "You do not seem to have a stable internet connection.",
        })
      );
      dispatch(bhandaraCheckinActions.renderApp());
    }
  },
  onUnmount: noop,
});

function setAppVersionNumberOnLocalStorage(appVersionNumber: number) {
  window.localStorage.setItem("appVersion", appVersionNumber.toString());
}

function getAppVersionNumberFromLocalStorage(): number {
  const appVersion = window.localStorage.getItem("appVersion");
  const appVersionNumber = Number(appVersion);
  return appVersionNumber;
}
