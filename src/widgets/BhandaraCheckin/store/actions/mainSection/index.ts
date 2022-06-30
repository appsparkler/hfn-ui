import { MapDispatchToProps } from "react-redux";
import {
  mainSectionActions,
  getMainSectionInitialState,
} from "widgets/BhandaraCheckin/store";
import { SectionMainDispatchProps } from "widgets/BhandaraCheckin/SectionMain/SectionMain";
import { isAbhyasiId } from "utils";
import { bhandaraCheckinActions, snackbarActions } from "../../slices";
import { checkinWithAbhyasiId } from "../../api-async-thunks";

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
  onClickStart: async (userId) => {
    const $isAbhyasiId = isAbhyasiId(userId);
    if ($isAbhyasiId) {
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
  },
  onSwitchMode: () => {},
  onSwitchScanner: () => {},
});
