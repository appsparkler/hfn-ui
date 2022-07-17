import { Dispatch } from "react";
import { AnyAction } from "redux";
import { barcodeScannerV0Actions } from "../../slices";

export const handleClickScan = () => (dispatch: Dispatch<AnyAction>) => {
  dispatch(barcodeScannerV0Actions.show());
};
