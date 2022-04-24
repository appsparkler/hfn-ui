import { AnyAction, Dispatch } from "redux";
import { mainSectionActions } from "../../slices";

export const handleMountScanner = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(mainSectionActions.startProcessingScanButton());
};
