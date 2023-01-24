import { MapDispatchToProps } from "react-redux";
import {
  mainSectionActions,
  getMainSectionInitialState,
  handleSwitchScanner,
} from "widgets/BhandaraCheckin/store";
import { isAbhyasiId, isMobileOrEmail } from "utils";
import {
  modeActions,
  updateDetailsActions,
} from "widgets/BhandaraCheckin/store/slices";
import { Action, Dispatch } from "redux";
import { pageActions } from "widgets/BhandaraCheckin/routing";
import {
  ABHYASI_ID_CHECKIN_SCREEN,
  DASHBOARD,
  REFRESH_APP,
} from "widgets/BhandaraCheckin/routing/actions/page";
import { SectionMainDispatchProps } from "widgets/BhandaraCheckin/types";
import { handleClickScan } from "./handleClickScan";
import { abhyasiIdCheckinScreenActions } from "../../slices/abhyasiIdCheckinScreen";

export const mapDispatchToProps: MapDispatchToProps<
  SectionMainDispatchProps,
  {}
> = (dispatch) => ({
  onRefresh: async () => {
    dispatch(REFRESH_APP());
  },
  onMount: async () => {},
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
  onSwitchScanner: (checked) => dispatch<any>(handleSwitchScanner(checked)),
  onChangeBatch: (_name, value) => {
    dispatch(mainSectionActions.setBatch(String(value)));
  },
  onClickDashboard: () => dispatch(DASHBOARD()),
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
  dispatch(abhyasiIdCheckinScreenActions.setAbhyasiId(abhyasiId));
  dispatch(ABHYASI_ID_CHECKIN_SCREEN());
  // dispatch(mainSectionActions.startProcessing());
  // const isCheckedInRes = await dispatch<any>(isAbhyasiCheckedIn(abhyasiId));
  // if (isCheckedInRes.meta.requestStatus === "rejected") {
  //   if (isCheckedInRes.payload === ErrorCodes.ABHYASI_ALREADY_CHECKED_IN) {
  //     const errorAction = mainSectionActions.setError(
  //       errorAbhyasiAlreadyCheckedin(abhyasiId)
  //     );
  //     dispatch(errorAction);
  //   }
  // } else {
  //   const res = await dispatch<any>(checkinWithAbhyasiId(abhyasiId));
  //   if (res.meta.requestStatus === "fulfilled") {
  //     // dispatch(pageActions.CHECKIN_SUCCESS());
  //   } else {
  //     dispatch(
  //       snackbarActions.openSnackbar({
  //         children: ErrorCodes.SERVER_ERROR,
  //       })
  //     );
  //   }
  // }

  // dispatch(mainSectionActions.stopProcessing());
}
