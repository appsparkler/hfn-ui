import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  LocalStorageKeys,
  removeScannerOnKey,
} from "widgets/BhandaraCheckin/constants";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import { bhandaraCheckinActions, mainSectionActions } from "../../../slices";

export const handleSwitchScanner = createAsyncThunk<
  void,
  boolean,
  ThunkApiConfig
>("main-section/handleSwitchScanner", async (checked, { dispatch }) => {
  if (!checked) {
    dispatch(mainSectionActions.turnOffScanner());
    dispatch(bhandaraCheckinActions.unmountScanner());
    removeScannerOnKey();
  } else {
    dispatch(bhandaraCheckinActions.renderScanner());
  }
});
