export enum PNRType {
  FREE_ACCOMODATION,
  PAID_ACCOMODATION,
}

export interface IFreeAccomodationQR {
  eventName: string;
  session: string;
  pnr: string;
  pnrType: PNRType.FREE_ACCOMODATION
}

export interface IPaidAccomodationQR {
  eventName: string;
  pnr: string;
  eventId: string;
  pnrType: PNRType.PAID_ACCOMODATION
}

export type IQREventInfo = IFreeAccomodationQR | IPaidAccomodationQR;

export interface IQRUserInfo {
  abhyasiId: string;
  regId: string;
  fullName: string;
  dormPrference?: string;
  berthPreference?: string;
}
