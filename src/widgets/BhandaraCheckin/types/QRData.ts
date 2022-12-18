export interface IQREventInfo {
  eventName: string;
  pnr: string;
  eventId: string;
}

export interface IQRUserInfo {
  abhyasiId: string;
  regId: string;
  fullName: string;
  dormPrference?: string;
  berthPreference?: string;
}
