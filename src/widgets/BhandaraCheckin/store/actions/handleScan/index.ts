import { AnyAction, Dispatch } from "redux";
import { isAbhyasiId } from "utils";
import { barcodeScannerActions, mainSectionActions } from "../../slices";
import { checkinAbhyasi } from "../mainSection";
import { startCheckin } from "../startCheckin";

export const handleScan =
  (value: string) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(barcodeScannerActions.hide());
    dispatch(mainSectionActions.setValue(value.trim()));
    dispatch<any>(startCheckin(value));
  };

export const handleScanV2 =
  (scannedValue: string) => (dispatch: Dispatch<AnyAction>) => {
    const refinedValue = scannedValue.trim();
    const $isAbhyasiId = isAbhyasiId(refinedValue);
    if ($isAbhyasiId) {
      dispatch(mainSectionActions.setValue(refinedValue));
      dispatch(barcodeScannerActions.hide());
      checkinAbhyasi(dispatch, refinedValue);
    }
  };
