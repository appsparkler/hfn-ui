import { MapDispatchToProps } from "react-redux";
import { IAbhyasiIDCheckinScreenDispatchProps } from "widgets/BhandaraCheckin/types";

export const mapAbhyasiIDCheckinScreenDispatchToProps: MapDispatchToProps<
  IAbhyasiIDCheckinScreenDispatchProps,
  {}
> = (dispatch, ownProps) => ({
  onCancel: console.log,
  onCheckin: console.log,
  onChangeDormAndBirthAllocation: console.log,
});
//
