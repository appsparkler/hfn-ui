import { MapDispatchToProps } from "react-redux";
import {
  mainSectionActions,
  getMainSectionInitialState,
} from "widgets/BhandaraCheckin/store";
import { SectionMainDispatchProps } from "widgets/BhandaraCheckin/SectionMain/SectionMain";
import { isAbhyasiId, isMobileOrEmail } from "utils";
import { bhandaraCheckinActions, snackbarActions } from "../../slices";
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
  onClickScan: () => {},
  onClickStart: async (inputValue) => {
    const $isAbhyasiId = isAbhyasiId(inputValue);
    if ($isAbhyasiId) {
      checkinAbhyasi(dispatch, inputValue);
    }

    const $isMobileOrEmail = isMobileOrEmail(inputValue);
    alert($isMobileOrEmail);
    if ($isMobileOrEmail) {
      dispatch(bhandaraCheckinActions.goToUpdateDetails());
    }
  },
  onSwitchMode: () => {},
  onSwitchScanner: () => {},
});

async function checkinAbhyasi(dispatch: Dispatch<Action<any>>, userId: string) {
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
