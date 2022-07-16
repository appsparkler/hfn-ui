import { createAsyncThunk } from "@reduxjs/toolkit";
import { AnyAction, Dispatch } from "redux";
import { LocalStorageKeys } from "widgets/BhandaraCheckin/constants";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import { bhandaraCheckinActions, mainSectionActions } from "../../../slices";

export const handleSwitchScanner = createAsyncThunk<
  void,
  boolean,
  ThunkApiConfig
>("main-section/handleSwitchScanner", async (checked) => {
  const res = await navigator.mediaDevices.getUserMedia();
});
// (checked: boolean) => (dispatch: Dispatch<AnyAction>) => {
//   if (checked) {
//     dispatch(mainSectionActions.turnOnScanner());
//     dispatch(bhandaraCheckinActions.renderScanner());
//     localStorage.setItem(LocalStorageKeys.TURN_ON_SCANNER, "true");
//   } else {
//     dispatch(mainSectionActions.turnOffScanner());
//     dispatch(bhandaraCheckinActions.unmountScanner());
//     localStorage.removeItem(LocalStorageKeys.TURN_ON_SCANNER);
//   }
// };
