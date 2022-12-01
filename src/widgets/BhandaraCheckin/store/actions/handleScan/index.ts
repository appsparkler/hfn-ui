import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAbhyasiId } from "utils";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import { RootState } from "../..";
import { barcodeScannerActions, mainSectionActions } from "../../slices";
import { checkinAbhyasi } from "../mainSectionMapDispatchToProps";

const refineScannedValue = (value: string) => value.replace("\n", "");

export const handleScan = createAsyncThunk<void, string, ThunkApiConfig>(
  "handleScan",
  (scannedValue, { dispatch, getState }) => {
    const rootState = getState() as RootState;
    const refinedValue = scannedValue.trim();
    const isScannerShown = rootState.barcodeScanner.show;
    if (isScannerShown) {
      const eventInfo = getEventInfo(scannedValue);
      const users = getUsers(scannedValue);
      console.log({ eventInfo, users });
    }
    if (isScannerShown && isAbhyasiId(refinedValue)) {
      dispatch(barcodeScannerActions.hide());
      dispatch(mainSectionActions.setValue(refinedValue));
      dispatch(barcodeScannerActions.hide());
      checkinAbhyasi(dispatch, refinedValue);
    }
  }
);

function getUsers(scannedValue: string) {
  const [, ...userRows] = scannedValue.split(";");
  const users = userRows.reduce((acc, userRow) => {
    if (!userRow) return acc;
    const [regId, abhyasiId, fullName] = userRow.split("|");
    const user = {
      fullName: !!fullName && refineScannedValue(fullName),
      regId: !!regId && refineScannedValue(regId),
      abhyasiId: !!abhyasiId && refineScannedValue(abhyasiId),
    };
    return [...acc, user];
  }, [] as any[]);
  return users;
}

function getEventInfo(scannedValue: string) {
  const [eventInfoRow] = scannedValue.split(";");
  const [eventName, pnr, eventId] = eventInfoRow.split("|");
  const eventInfo = {
    eventName,
    eventId,
    pnr,
  };
  return eventInfo;
}
