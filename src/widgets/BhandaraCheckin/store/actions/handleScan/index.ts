import { AnyAction, Dispatch } from "redux";
import { isAbhyasiId } from "utils";
import { barcodeScannerV0Actions, mainSectionActions } from "../../slices";
import { checkinAbhyasi } from "../mainSectionMapDispatchToProps";

export const handleScan =
  (scannedValue: string) => (dispatch: Dispatch<AnyAction>) => {
    const refinedValue = scannedValue.trim();
    const $isAbhyasiId = isAbhyasiId(refinedValue);
    if ($isAbhyasiId) {
      dispatch(mainSectionActions.setValue(refinedValue));
      dispatch(barcodeScannerV0Actions.hide());
      checkinAbhyasi(dispatch, refinedValue);
    }
  };
