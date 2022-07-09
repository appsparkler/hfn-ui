import { MapDispatchToProps } from "react-redux";
import {
  mainSectionActions,
  getMainSectionInitialState,
  handleSwitchScanner,
  handleClickScan,
} from "widgets/BhandaraCheckin/store";
import { isAbhyasiId, isMobileOrEmail } from "utils";
import {
  modeActions,
  snackbarActions,
  updateDetailsActions,
} from "widgets/BhandaraCheckin/store/slices";
import {
  checkinWithAbhyasiId,
  isAbhyasiCheckedIn,
} from "widgets/BhandaraCheckin/store/api-async-thunks";
import { Action, Dispatch } from "redux";
import { pageActions } from "widgets/BhandaraCheckin/routing";
import { OFFLINE_DATA } from "widgets/BhandaraCheckin/routing/actions/page";
import { SectionMainDispatchProps } from "widgets/BhandaraCheckin/types";
import * as serviceWorkerRegistration from "serviceWorkerRegistration";
import {
  errorAbhyasiAlreadyCheckedin,
  isLocalDevEnv,
  isOfflineMode,
} from "widgets/BhandaraCheckin/utils";
import { ErrorCodes } from "widgets/BhandaraCheckin/constants";
import {
  turnOffOfflineMode,
  turnOnOfflineMode,
} from "widgets/BhandaraCheckin/firebase";

export const mapDispatchToProps: MapDispatchToProps<
  SectionMainDispatchProps,
  {}
> = (dispatch) => ({
  onRefresh: async () => {
    const registrations = await navigator.serviceWorker.getRegistrations();
    registrations.forEach((registration) => {
      registration.unregister();
    });
    serviceWorkerRegistration.register();
    window.location.reload();
  },
  onMount: async () => {
    if (isLocalDevEnv()) {
      if (isOfflineMode()) {
        await turnOnOfflineMode();
        dispatch(mainSectionActions.enableOfflineMode());
      } else {
        await turnOffOfflineMode();
        dispatch(mainSectionActions.disableOfflineMode());
      }
    }
  },
  onClickOfflineData: () => {
    dispatch(OFFLINE_DATA());
  },
  onSwitchOfflineMode: async (isOfflineMode) => {
    if (isOfflineMode) {
      await turnOnOfflineMode();
      dispatch(mainSectionActions.enableOfflineMode());
    } else {
      await turnOffOfflineMode();
      dispatch(mainSectionActions.disableOfflineMode());
    }
  },
  onChange: (updatedValue) => {
    dispatch(
      mainSectionActions.setState({
        ...getMainSectionInitialState(),
        value: updatedValue,
      })
    );
  },
  onClickScan: () => handleClickScan()(dispatch),
  onClickStart: async (inputValue) => {
    const $isAbhyasiId = isAbhyasiId(inputValue);
    if ($isAbhyasiId) {
      const refinedValue = inputValue.trim().toUpperCase();
      await checkinAbhyasi(dispatch, refinedValue);
    }
    const $isMobileOrEmail = isMobileOrEmail(inputValue);
    if ($isMobileOrEmail) {
      dispatch(updateDetailsActions.prepare(inputValue));
      dispatch(pageActions.UPDATE_DETAILS());
    }
  },
  onSwitchMode: (checked: boolean) => {
    if (checked) {
      setDarkMode(dispatch);
    } else {
      setLightMode(dispatch);
    }
  },
  onSwitchScanner: (checked) => handleSwitchScanner(checked)(dispatch),
});

function setLightMode(dispatch: Dispatch<Action<any>>) {
  dispatch(modeActions.setLightTheme());
  dispatch(mainSectionActions.setLightMode());
}

function setDarkMode(dispatch: Dispatch<Action<any>>) {
  dispatch(modeActions.setDarkTheme());
  dispatch(mainSectionActions.setDarkMode());
}

export async function checkinAbhyasi(
  dispatch: Dispatch<Action<any>>,
  abhyasiId: string
) {
  dispatch(mainSectionActions.startProcessing());
  const isCheckedInRes = await dispatch<any>(isAbhyasiCheckedIn(abhyasiId));
  if (isCheckedInRes.meta.requestStatus === "rejected") {
    if (isCheckedInRes.payload === ErrorCodes.ABHYASI_ALREADY_CHECKED_IN) {
      const errorAction = mainSectionActions.setError(
        errorAbhyasiAlreadyCheckedin(abhyasiId)
      );
      dispatch(errorAction);
    }
  } else {
    const res = await dispatch<any>(checkinWithAbhyasiId(abhyasiId));
    if (res.meta.requestStatus === "fulfilled") {
      dispatch(pageActions.CHECKIN_SUCCESS());
    } else {
      dispatch(
        snackbarActions.openSnackbar({
          children: ErrorCodes.SERVER_ERROR,
        })
      );
    }
  }

  dispatch(mainSectionActions.stopProcessing());
}
