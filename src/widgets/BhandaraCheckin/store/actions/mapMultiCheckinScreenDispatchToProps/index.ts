import { Dispatch } from "redux";
import { MapDispatchToProps } from "react-redux";
import { MultiCheckinScreenDispatchProps } from "widgets/BhandaraCheckin/types";
import { multiCheckinScreenActions } from "../../slices";

export const mapMultiCheckinScreenDispatchToProps: MapDispatchToProps<
  MultiCheckinScreenDispatchProps,
  {}
> = (dispatch: Dispatch) => ({
  onChangeData: (checkins) => {
    dispatch(multiCheckinScreenActions.setUserData(checkins));
  },
  onClickCancel: () => {},
  onClickCheckin: () => {},
});
