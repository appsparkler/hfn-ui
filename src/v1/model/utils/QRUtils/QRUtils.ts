import { CheckinTypeEnum } from "../../interfaces/CheckinTypeEnum";

interface QRCheckinsAndMore {
  checkins: IQRCodeCheckinAPIPayload[];
  more: string;
}

interface IQRCodeCheckinAPIPayload {
  eventName: string;
  registrationId: string;
  abhyasiId: string;
  batch: string;
  orderId: string;
  pnr: string;
  fullName: string;
  dormPreference: string;
  berthPreference: string;
  dormAndBerthAllocation: string;
  timestamp: number;
  type: string;
}

interface EventOrderGeneralDetails {
  eventTitle: string;
  pnr: string;
  orderId: string;
}

export enum QRType {
  PAID_ACCOMMODATION = "PAID_ACCOMMODATION",
  OWN_ACCOMMODATION = "OWN_ACCOMMODATION",
  NONE = "NONE",
}

export class QRUtils {
  refineQR(rawValue: string): string {
    return rawValue.replace(/\n/g, "");
  }

  getQRCheckinsAndMore(rawValue: string): QRCheckinsAndMore {
    const moreRegex = /(\d+\s+more\.\.)/;
    const moreMatch = rawValue.match(moreRegex);
    const more = moreMatch ? moreMatch[1] : "";
    const refinedValue = this.refineQR(rawValue);
    const refinedValueWithoutMore = refinedValue.replace(moreRegex, "");
    const checkins = this.getQRCheckins(refinedValueWithoutMore);
    return { checkins, more };
  }

  isQRValid(value: string): boolean {
    const refinedValue = this.refineQR(value);
    try {
      const generalDetails = this.getGeneralDetails(refinedValue);
      const isValidEventTitle = generalDetails.eventTitle !== "";
      const isValidPnr = /[A-Z]{2}-[A-Z]{4}-[A-Z]{4}/.test(generalDetails.pnr);
      const isValidOrderId = generalDetails.orderId !== "";
      const allCheckins = this.getQRCheckinsAndMore(refinedValue);
      return (
        isValidEventTitle &&
        isValidPnr &&
        isValidOrderId &&
        allCheckins.checkins.length > 0
      );
    } catch (e) {
      return false;
    }
  }

  getQRCheckins(value: string): IQRCodeCheckinAPIPayload[] {
    const refinedValue = value.replace(/\n/g, "");
    const generalDetails = this.getGeneralDetails(refinedValue);
    const rows = refinedValue.split(";");
    const checkinRows = rows.slice(1);
    const checkins = checkinRows
      .filter((row) => row.trim() !== "")
      .map((row) => {
        const columns = row.split("|").map((col) => col.trim());
        // const hasBatchAndIsPaid = columns.length === 6;
        return {
          registrationId: columns[0],
          batch: columns[1],
          abhyasiId: columns[2],
          fullName: columns[3] ?? "",
          dormPreference: columns[4] ?? "",
          berthPreference: columns[5] ?? "",
          timestamp: 0,
          dormAndBerthAllocation: "",
          pnr: generalDetails.pnr,
          eventName: generalDetails.eventTitle,
          orderId: generalDetails.orderId,
          type: CheckinTypeEnum.QR,
        };
      });
    return checkins;
  }

  getGeneralDetails(value: string): EventOrderGeneralDetails {
    const rows = value.split(";");
    const qrType = this.getQRType(value);
    const firstRow = rows[0];
    const columnsInFirstRow = firstRow.split("|").map((col) => col.trim());
    if (qrType === QRType.PAID_ACCOMMODATION) {
      return {
        eventTitle: columnsInFirstRow[0],
        pnr: columnsInFirstRow[1],
        orderId: columnsInFirstRow[2],
      };
    }
    return {
      eventTitle: columnsInFirstRow[0],
      orderId: columnsInFirstRow[1],
      pnr: columnsInFirstRow[2],
    };
  }

  getQRType(rawValue: string): QRType {
    const refinedValue = this.refineQR(rawValue);
    const rows = refinedValue.split(";");
    const firstRow = rows[0];
    const columnsInFirstRow = firstRow.split("|").map((col) => col.trim());
    const isPNR = (str: string) => /[A-Z]{2}-[A-Z]{4}-[A-Z]{4}/.test(str);
    if (isPNR(columnsInFirstRow[1])) {
      return QRType.PAID_ACCOMMODATION;
    }
    if (isPNR(columnsInFirstRow[2])) {
      return QRType.OWN_ACCOMMODATION;
    }
    return QRType.NONE;
  }

  // mapQRCheckinsToQRCheckinsCardState(
  //   checkinsAndMore: QRCheckinsAndMore
  // ): QRCheckinCardState[] {
  //   return checkinsAndMore.checkins.map((checkin) => ({
  //     isSelected: false,
  //     fullName: checkin.fullName,
  //     eventName: checkin.eventName,
  //     abhyasiId: checkin.abhyasiId,
  //     pnr: checkin.pnr,
  //     registrationId: checkin.registrationId,
  //     batch: checkin.batch,
  //     berthPreference: checkin.berthPreference,
  //     dormPreference: checkin.dormPreference,
  //     dormAndBerthAllocation: checkin.dormAndBerthAllocation,
  //   }));
  // }
}

// interface QRCheckinCardState {
//   isSelected: boolean;
//   fullName: string;
//   eventName: string;
//   abhyasiId: string;
//   pnr: string;
//   registrationId: string;
//   batch: string;
//   berthPreference: string;
//   dormPreference: string;
//   dormAndBerthAllocation: string;
// }
