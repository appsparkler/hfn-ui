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
import { checkinWithAbhyasiId } from "widgets/BhandaraCheckin/store/api-async-thunks";
import { Action, Dispatch } from "redux";
import { pageActions } from "widgets/BhandaraCheckin/routing";
import { OFFLINE_DATA } from "widgets/BhandaraCheckin/routing/actions/page";
import { SectionMainDispatchProps } from "widgets/BhandaraCheckin/types";
import { isOfflineMode } from "widgets/BhandaraCheckin/utils";

export const mapDispatchToProps: MapDispatchToProps<
  SectionMainDispatchProps,
  {}
> = (dispatch) => ({
  onMount: () => {
    const { enableOfflineMode, disableOfflineMode } = mainSectionActions;
    dispatch(isOfflineMode() ? enableOfflineMode() : disableOfflineMode());
  },
  onClickOfflineData: () => {
    dispatch(OFFLINE_DATA());
  },
  onSwitchOfflineMode: (isOfflineMode) => {
    if (isOfflineMode) {
      dispatch(mainSectionActions.enableOfflineMode());
    } else {
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
  userId: string
) {
  dispatch(mainSectionActions.startProcessing());
  const res = await dispatch<any>(checkinWithAbhyasiId(userId));
  if (res.meta.requestStatus === "fulfilled") {
    dispatch({
      type: "CheckInSuccess",
      payload: {
        location: {},
      },
    });
    dispatch(pageActions.CHECKIN_SUCCESS());
  } else {
    dispatch(
      snackbarActions.openSnackbar({
        children: "Ooops! Something went wrong!!",
      })
    );
  }
  dispatch(mainSectionActions.stopProcessing());
}
