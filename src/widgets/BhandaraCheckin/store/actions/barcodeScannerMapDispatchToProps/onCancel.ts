import { AnyAction } from "@reduxjs/toolkit";
import { Dispatch } from "react";
import { barcodeScannerActions } from "../../slices";

export const onCancel = (dispatch: Dispatch<AnyAction>) => {
  dispatch(barcodeScannerActions.hide());
};
