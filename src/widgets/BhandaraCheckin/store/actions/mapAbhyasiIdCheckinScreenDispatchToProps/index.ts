import { MapDispatchToProps } from "react-redux";
import { Action, Dispatch } from "redux";
import { IAbhyasiIDCheckinScreenDispatchProps } from "widgets/BhandaraCheckin/types";
import { abhyasiIdCheckinScreenActions } from "../../slices/abhyasiIdCheckinScreen";

export const mapAbhyasiIDCheckinScreenDispatchToProps: MapDispatchToProps<
  IAbhyasiIDCheckinScreenDispatchProps,
  {}
> = (dispatch: Dispatch<Action<any>>) => {
  return {
    onCancel: console.log,
    onCheckin: console.log,
    onChangeDormAndBirthAllocation: ({ target: { value } }) => {
      dispatch(abhyasiIdCheckinScreenActions.setDormAndBirthAllocation(value));
    },
  };
};
