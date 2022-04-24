import { AnyAction, Dispatch } from "redux";
import { mainSectionActions } from "../../slices";

export const handleSwitchScanner =
  (checked: boolean) => (dispatch: Dispatch<AnyAction>) => {
    if (checked) {
      dispatch(mainSectionActions.turnOnScanner());
    } else {
      dispatch(mainSectionActions.turnOffScanner());
    }
  };
