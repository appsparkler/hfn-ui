import { MapDispatchToProps } from "react-redux";
import {
  mainSectionActions,
  getMainSectionInitialState,
  handleSwitchScanner,
  handleClickScan,
} from "widgets/BhandaraCheckinV0/store";
import { SectionMainDispatchProps } from "widgets/BhandaraCheckinV0/SectionMain/SectionMain";
import { isAbhyasiId, isMobileOrEmail } from "utils";
import {
  bhandaraCheckinActions,
  modeActions,
  snackbarActions,
  updateDetailsV2Actions,
} from "../../slices";
import { checkinWithAbhyasiId } from "../../api-async-thunks";
import { Action, Dispatch } from "redux";

export const mainSectionMapDispatchToProps: MapDispatchToProps<
  SectionMainDispatchProps,
  {}
> = (dispatch) => ({
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
      checkinAbhyasi(dispatch, inputValue);
    }
    const $isMobileOrEmail = isMobileOrEmail(inputValue);
    if ($isMobileOrEmail) {
      dispatch(updateDetailsV2Actions.prepare(inputValue));
      dispatch(bhandaraCheckinActions.goToUpdateDetails());
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
  const res = await dispatch<any>(checkinWithAbhyasiId(userId));
  if (res.meta.requestStatus === "fulfilled") {
    dispatch(bhandaraCheckinActions.goToCheckinSuccess());
  } else {
    dispatch(
      snackbarActions.openSnackbar({
        children: "Ooops! Something went wrong!!",
      })
    );
  }
}
