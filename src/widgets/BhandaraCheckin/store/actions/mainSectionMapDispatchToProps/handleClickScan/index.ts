import { Dispatch } from "react";
import { AnyAction } from "redux";
import { barcodeScannerActions } from "../../../slices";

export const handleClickScan = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(barcodeScannerActions.show());
};
