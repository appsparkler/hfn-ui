import { AnyAction, Dispatch } from "redux";
import { LocalStorageKeys } from "widgets/BhandaraCheckinV2/constants";
import { bhandaraCheckinActions, mainSectionActions } from "../../slices";

export const handleSwitchScanner =
  (checked: boolean) => (dispatch: Dispatch<AnyAction>) => {
    if (checked) {
      dispatch(mainSectionActions.turnOnScanner());
      dispatch(bhandaraCheckinActions.renderScanner());
      localStorage.setItem(LocalStorageKeys.TURN_ON_SCANNER, "true");
    } else {
      dispatch(mainSectionActions.turnOffScanner());
      dispatch(bhandaraCheckinActions.unmountScanner());
      localStorage.removeItem(LocalStorageKeys.TURN_ON_SCANNER);
    }
  };
