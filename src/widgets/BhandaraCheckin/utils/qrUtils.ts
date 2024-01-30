import { Batch, CheckinTypesEnum } from "../types";
import { EventOrderGeneralDetails } from "./EventOrderGeneralDetails";
import { QRCheckinsAndMore } from "./QRCheckinsAndMore";
import { QRCodeCheckin } from "./QRCodeCheckin";
import { QRType } from "./QRType";

const refineQR = (input: string): string => input.replace(/\n/g, "");

export function getQRCheckinsAndMore(rawValue: string): QRCheckinsAndMore {
  const moreRegex = /(\d+\s+more\.\.)/;
  const moreMatch = rawValue.match(moreRegex);
  const more = moreMatch !== null ? moreMatch[1] : "";
  const refinedValue = refineQR(rawValue);
  const refinedValueWithoutMore = refinedValue.replace(moreRegex, "");
  const checkins = getQRCheckins(refinedValueWithoutMore);
  return { checkins, more };
}

export function isQRValid(value: string): boolean {
  const refinedValue = refineQR(value);
  try {
    const generalDetails = getGeneralDetails(refinedValue);
    const isValidEventTitle = generalDetails.eventTitle.length > 0;
    const isValidPnr = /[A-Z]{2}-[A-Z]{4}-[A-Z]{4}/.test(generalDetails.pnr);
    const isValidOrderId = generalDetails.orderId.length > 0;
    const allCheckins = getQRCheckinsAndMore(refinedValue);
    const isValid =
      isValidEventTitle &&
      isValidPnr &&
      isValidOrderId &&
      allCheckins.checkins.length > 0;
    return isValid;
  } catch (e) {
    return false;
  }
}

function getQRCheckins(value: string): QRCodeCheckin[] {
  const refinedValue = value.replace(/\n/g, "");
  const generalDetails = getGeneralDetails(refinedValue);
  const rows = refinedValue.split(";");
  const checkinRows = rows.slice(1);
  const checkins = checkinRows
    .filter((checkinRow) => checkinRow.split("|").length > 3)
    .map((checkinRow) => {
      const columns = checkinRow.split("|");
      const rowType = getQRRowType(checkinRow);
      if (rowType === QRType.OWN_ACCOMMODATION) {
        return {
          regId: columns[0],
          batch: columns[1] as Batch,
          abhyasiId: columns[2],
          fullName: `${columns[3]}`,
          dormPreference: columns[4] || "",
          berthPreference: columns[5] || "",
          checkin: false,
          timestamp: 0,
          dormAndBerthAllocation: "",
          pnr: generalDetails.pnr,
          eventName: generalDetails.eventTitle,
          orderId: generalDetails.orderId,
          type: CheckinTypesEnum.QR,
        };
      }
      return {
        regId: columns[0],
        batch: columns[4] as Batch,
        abhyasiId: columns[1],
        fullName: `${columns[2]}`,
        dormPreference: columns[3] || "",
        berthPreference: columns[5] || "",
        checkin: false,
        timestamp: 0,
        dormAndBerthAllocation: "",
        pnr: generalDetails.pnr,
        eventName: generalDetails.eventTitle,
        orderId: generalDetails.orderId,
        type: CheckinTypesEnum.QR,
      };
    });
  return checkins;
}

function getGeneralDetails(value: string): EventOrderGeneralDetails {
  const rows = value.split(";");
  const firstRow = rows[0];
  const columnsInFirstRow = firstRow.split("|").map((column) => column.trim());

  return {
    eventTitle: columnsInFirstRow[0],
    orderId: columnsInFirstRow[1],
    pnr: columnsInFirstRow[2],
  };
}

function getQRRowType(row: string): QRType {
  const columnsInRow:string[] = row.split("|").map((column) => column.trim());

  if (columnsInRow.length > 4) {
    return QRType.PAID_ACCOMMODATION;
  } else {
    return QRType.OWN_ACCOMMODATION
  }
}