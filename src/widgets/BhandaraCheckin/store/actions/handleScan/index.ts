import { AnyAction, Dispatch } from "redux";
import { barcodeScannerActions, mainSectionActions } from "../../slices";
import { startCheckin } from "../startCheckin";

export const handleScan =
  (value: string) => (dispatch: Dispatch<AnyAction>) => {
    dispatch(barcodeScannerActions.hide());
    dispatch(mainSectionActions.setValue(value));
    dispatch<any>(startCheckin(value));
  };
