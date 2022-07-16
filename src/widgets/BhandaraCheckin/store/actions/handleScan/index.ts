import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAbhyasiId } from "utils";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import { RootState } from "../..";
import { barcodeScannerActions, mainSectionActions } from "../../slices";
import { checkinAbhyasi } from "../mainSectionMapDispatchToProps";

export const handleScan = createAsyncThunk<void, string, ThunkApiConfig>(
  "handleScan",
  (scannedValue, { dispatch, getState }) => {
    const rootState = getState() as RootState;
    const refinedValue = scannedValue.trim();
    const isScannerShown = rootState.barcodeScanner.show;
    if (isScannerShown && isAbhyasiId(refinedValue)) {
      dispatch(barcodeScannerActions.hide());
      dispatch(mainSectionActions.setValue(refinedValue));
      dispatch(barcodeScannerActions.hide());
      checkinAbhyasi(dispatch, refinedValue);
    }
  }
);
