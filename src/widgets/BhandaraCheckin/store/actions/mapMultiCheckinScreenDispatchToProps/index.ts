import { Dispatch } from "redux";
import { MapDispatchToProps } from "react-redux";
import { MultiCheckinScreenDispatchProps } from "widgets/BhandaraCheckin/types";

export const mapMultiCheckinScreenDispatchToProps: MapDispatchToProps<
  MultiCheckinScreenDispatchProps,
  {}
> = (dispatch: Dispatch) => ({
  onChangeData: (checkins) => {},
  onClickCancel: () => {},
  onClickCheckin: () => {},
});
