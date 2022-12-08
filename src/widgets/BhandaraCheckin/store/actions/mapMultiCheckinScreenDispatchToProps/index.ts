import { Dispatch } from "redux";
import { MapDispatchToProps } from "react-redux";
import { MultiCheckinScreenDispatchProps } from "widgets/BhandaraCheckin/types";
import {
  mainSectionActions,
  multiCheckinScreenActions,
} from "widgets/BhandaraCheckin/store";
import { pageActions } from "widgets/BhandaraCheckin/routing";

export const mapMultiCheckinScreenDispatchToProps: MapDispatchToProps<
  MultiCheckinScreenDispatchProps,
  {}
> = (dispatch: Dispatch) => ({
  onChangeData: (checkins) => {
    dispatch(multiCheckinScreenActions.setUserData(checkins));
  },
  onClickCancel: () => {
    dispatch(mainSectionActions.reset());
    dispatch(pageActions.HOME());
  },
  onClickCheckin: () => {},
});
