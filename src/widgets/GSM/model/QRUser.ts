export interface IQRUser {
  name: string;
  eventName: string;
  sessionName: string;
  registrationId: string;
  pnr: string;
  checkinTime: number;
  uid: string | null;
  platform: "WEB";
}
