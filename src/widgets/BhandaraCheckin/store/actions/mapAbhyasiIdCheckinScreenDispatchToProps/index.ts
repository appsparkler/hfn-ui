import { MapDispatchToProps } from "react-redux";
import { Action, Dispatch } from "redux";
import { pageActions } from "widgets/BhandaraCheckin/routing";
import { IAbhyasiIDCheckinScreenDispatchProps } from "widgets/BhandaraCheckin/types";
import { mainSectionActions } from "../../slices";
import { abhyasiIdCheckinScreenActions } from "../../slices/abhyasiIdCheckinScreen";

export const mapAbhyasiIDCheckinScreenDispatchToProps: MapDispatchToProps<
  IAbhyasiIDCheckinScreenDispatchProps,
  {}
> = (dispatch: Dispatch<Action<any>>) => {
  return {
    onCancel: () => {
      dispatch(mainSectionActions.reset());
      dispatch(pageActions.HOME());
    },
    onCheckin: console.log,
    onChangeDormAndBirthAllocation: ({ target: { value } }) => {
      dispatch(abhyasiIdCheckinScreenActions.setDormAndBirthAllocation(value));
    },
  };
};
