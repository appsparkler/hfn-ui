import { createAsyncThunk } from "@reduxjs/toolkit";
import { LocalStorageKeys } from "widgets/BhandaraCheckin/constants";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import { snackbarActions } from "widgets/BhandaraCheckinV0/store";
import { bhandaraCheckinActions, mainSectionActions } from "../../../slices";

export const handleSwitchScanner = createAsyncThunk<
  void,
  boolean,
  ThunkApiConfig
>("main-section/handleSwitchScanner", async (checked, { dispatch }) => {
  if (!checked) {
    dispatch(mainSectionActions.turnOffScanner());
    dispatch(bhandaraCheckinActions.unmountScanner());
    localStorage.removeItem(LocalStorageKeys.TURN_ON_SCANNER);
  } else {
    try {
      dispatch(mainSectionActions.startProcessingScanButton());
      dispatch(mainSectionActions.turnOnScanner());
      await navigator.mediaDevices.getUserMedia({ video: true });
      dispatch(bhandaraCheckinActions.renderScanner());
      localStorage.setItem(LocalStorageKeys.TURN_ON_SCANNER, "true");
    } catch (e) {
      dispatch(
        snackbarActions.openSnackbar({
          children:
            "Scanner cannot be turned on without camera permisson. Please reset the permissions and try again.",
        })
      );
      dispatch(mainSectionActions.stopProcessingScanButton());
      dispatch(mainSectionActions.turnOffScanner());
    }
  }
});
