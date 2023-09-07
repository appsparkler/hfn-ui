import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAbhyasiId } from "utils";
import { MULTI_CHECKIN_SCREEN } from "widgets/BhandaraCheckin/routing/actions/page";
import {
  IQRUserInfo,
  PNRType,
  ThunkApiConfig,
} from "widgets/BhandaraCheckin/types";
import { IQREventInfo } from "widgets/BhandaraCheckin/types";
import { RootState } from "../..";
import {
  barcodeScannerActions,
  mainSectionActions,
  multiCheckinScreenActions,
} from "../../slices";
import { checkinAbhyasi } from "../mainSectionMapDispatchToProps";

export const getPNRType = (str: string): PNRType | void => {
  const [, part2, part3] = str.split("|");
  if (part3.match(/[A-Z]{2}-[A-Z]{4}-[A-Z]{4}/))
    return PNRType.FREE_ACCOMODATION;
  if (part2.match(/[A-Z]{2}-[A-Z]{4}-[A-Z]{4}/))
    return PNRType.PAID_ACCOMODATION;
};

export function getEventInfo(scannedValue: string): IQREventInfo {
  const [eventInfoRow] = scannedValue.split(";");
  const pnrType = getPNRType(eventInfoRow);
  if (pnrType === PNRType.FREE_ACCOMODATION) {
    const [eventName, session, pnr] = eventInfoRow.split("|");
    return {
      eventName,
      session: session.trim(),
      pnr: pnr.trim(),
      pnrType: PNRType.FREE_ACCOMODATION,
    };
  }
  const [eventName, pnr, orderId] = eventInfoRow.split("|");
  const eventInfo: IQREventInfo = {
    eventName: eventName.trim(),
    orderId: orderId.trim(),
    pnr: pnr.trim(),
    pnrType: PNRType.PAID_ACCOMODATION,
  };
  return eventInfo;
}

const refineScannedValue = (value: string) => value.replace(/\n/g, "");

const isValidQRCode = (scannedValue: string) => {
  try {
    const eventInfo = getEventInfo(scannedValue);
    const users = getUsers(scannedValue);

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
    const { isScannerOn, batch } = rootState.mainSection;
    if (!isScannerOn) return;
    const refinedValue = scannedValue.trim();
    const isScannerShown = rootState.barcodeScanner.show;
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
      checkinAbhyasi(dispatch, refinedValue, batch);
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
    const [regId, abhyasiId, fullName, dormPrference, berthPreference] =
      userRow.split("|");
    if (!regId || !fullName) return acc;
    const user: Partial<IQRUserInfo> = {
      fullName: fullName ? refineScannedValue(fullName) : undefined,
      regId: regId ? refineScannedValue(regId) : undefined,
      abhyasiId: abhyasiId ? refineScannedValue(abhyasiId) : "",
      dormPrference: dormPrference
        ? refineScannedValue(dormPrference)
        : undefined,
      berthPreference: berthPreference
        ? refineScannedValue(berthPreference)
        : undefined,
    };
    return [...acc, user];
  }, [] as any[]);
  const filteredUsers: IQRUserInfo[] = users.filter(
    (user) => !!user.abhyasiId || !!user.regId || !!user.fullName
  );
  return filteredUsers;
}
