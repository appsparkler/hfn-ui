import { AnyAction, Dispatch } from "redux";
import { isAbhyasiId } from "utils";
import { barcodeScannerActions, mainSectionActions } from "../../slices";
// import { checkinAbhyasi } from "../";

export const handleScan =
  (scannedValue: string) => (dispatch: Dispatch<AnyAction>) => {
    const refinedValue = scannedValue.trim();
    const $isAbhyasiId = isAbhyasiId(refinedValue);
    if ($isAbhyasiId) {
      dispatch(mainSectionActions.setValue(refinedValue));
      dispatch(barcodeScannerActions.hide());
      // checkinAbhyasi(dispatch, refinedValue);
    }
  };
