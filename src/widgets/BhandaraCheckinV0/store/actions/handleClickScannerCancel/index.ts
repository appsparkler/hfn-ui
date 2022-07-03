import { AnyAction, Dispatch } from "redux";
import { barcodeScannerActions } from "../../slices";

export const handleClickScannerCancel =
  () => (dispatch: Dispatch<AnyAction>) => {
    dispatch(barcodeScannerActions.hide());
  };
