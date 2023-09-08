import { createAsyncThunk } from "@reduxjs/toolkit";
import { isAbhyasiId } from "utils";
import { MULTI_CHECKIN_SCREEN } from "widgets/BhandaraCheckin/routing/actions/page";
import { PNRType, ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import { IQREventInfo } from "widgets/BhandaraCheckin/types";
import { RootState } from "../..";
import {
  barcodeScannerActions,
  mainSectionActions,
  multiCheckinScreenActions,
} from "../../slices";
import { checkinAbhyasi } from "../mainSectionMapDispatchToProps";
import { getQRCheckinsAndMore, isQRValid } from "widgets/BhandaraCheckin/utils";

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

export const handleScan = createAsyncThunk<void, string, ThunkApiConfig>(
  "handleScan",
  (scannedValue, { dispatch, getState }) => {
    const rootState = getState() as RootState;
    const { isScannerOn, batch } = rootState.mainSection;
    if (!isScannerOn) return;
    const refinedValue = scannedValue.trim();
    const isScannerShown = rootState.barcodeScanner.show;
    if (isScannerShown && isQRValid(refinedValue)) {
      dispatch(barcodeScannerActions.hide());
      const qrCheckins = getQRCheckinsAndMore(refinedValue);
      dispatch(
        multiCheckinScreenActions.setData({
          event: getEventInfo(refinedValue),
          users: qrCheckins.checkins,
          more: qrCheckins.more,
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
