import { AnyAction, Dispatch } from "redux";
import { barcodeScannerV0Actions } from "../../slices";

export const handleClickScannerCancel =
  () => (dispatch: Dispatch<AnyAction>) => {
    dispatch(barcodeScannerV0Actions.hide());
  };
