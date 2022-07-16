import { AnyAction, Dispatch } from "redux";
import { barcodeScannerActions } from "../../slices";

export const onUnmount = (dispatch: Dispatch<AnyAction>) => {
  dispatch(barcodeScannerActions.usetCodeReader());
};
