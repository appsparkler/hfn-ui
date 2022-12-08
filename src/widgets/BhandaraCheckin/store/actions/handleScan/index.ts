import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAbhyasiId } from "utils";
import { MULTI_CHECKIN_SCREEN } from "widgets/BhandaraCheckin/routing/actions/page";
import { IQRUserInfo, ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import { IQREventInfo } from "widgets/BhandaraCheckin/types";
import { RootState } from "../..";
import {
  barcodeScannerActions,
  mainSectionActions,
  multiCheckinScreenActions,
} from "../../slices";
import { checkinAbhyasi } from "../mainSectionMapDispatchToProps";

const refineScannedValue = (value: string) => value.replace(/\n/g, "");

const isValidQRCode = (scannedValue: string) => {
  try {
    const users = getUsers(scannedValue);
    const eventInfo = getEventInfo(scannedValue);
    if (eventInfo.eventName && isValidPNR(eventInfo.pnr) && users.length > 0) {
      return true;
    }
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const handleScan = createAsyncThunk<void, string, ThunkApiConfig>(
  "handleScan",
  (scannedValue, { dispatch, getState }) => {
    const rootState = getState() as RootState;
    const refinedValue = scannedValue.trim();
    const isScannerShown = rootState.barcodeScanner.show;
    alert(
      JSON.stringify({
        scannedValue,
        isScannerShown,
        isValid: isValidQRCode(refinedValue),
      })
    );
    if (isScannerShown && isValidQRCode(refinedValue)) {
      dispatch(barcodeScannerActions.hide());
      dispatch(
        multiCheckinScreenActions.setData({
          event: getEventInfo(refinedValue),
          users: getUsers(refinedValue),
        })
      );
      dispatch(MULTI_CHECKIN_SCREEN());
    }
    if (isScannerShown && isAbhyasiId(refinedValue)) {
      dispatch(barcodeScannerActions.hide());
      dispatch(mainSectionActions.setValue(refinedValue));
      checkinAbhyasi(dispatch, refinedValue);
    }
  }
);

function isValidPNR(pnr: string) {
  return Boolean(pnr.match(/[A-Z]{2}-[A-Z]{4}-[A-Z]{4}/));
}

function getUsers(scannedValue: string): IQRUserInfo[] {
  const [, ...userRows] = scannedValue.split(";");
  const users = userRows.reduce((acc, userRow) => {
    if (!userRow) return acc;
    const [regId, abhyasiId, fullName, dormPrference, birthPreference] =
      userRow.split("|");
    if (!regId || !abhyasiId || !fullName) return acc;
    const user: Partial<IQRUserInfo> = {
      fullName: fullName ? refineScannedValue(fullName) : undefined,
      regId: regId ? refineScannedValue(regId) : undefined,
      abhyasiId: abhyasiId ? refineScannedValue(abhyasiId) : undefined,
      dormPrference: dormPrference
        ? refineScannedValue(dormPrference)
        : undefined,
      birthPreference: birthPreference
        ? refineScannedValue(birthPreference)
        : undefined,
    };
    return [...acc, user];
  }, [] as any[]);
  const filteredUsers: IQRUserInfo[] = users.filter(
    (user) => !!user.abhyasiId || !!user.regId || !!user.fullName
  );
  return filteredUsers;
}

function getEventInfo(scannedValue: string): IQREventInfo {
  const [eventInfoRow] = scannedValue.split(";");
  const [eventName, pnr, eventId] = eventInfoRow.split("|");
  const eventInfo: IQREventInfo = {
    eventName,
    eventId,
    pnr,
  };
  return eventInfo;
}
