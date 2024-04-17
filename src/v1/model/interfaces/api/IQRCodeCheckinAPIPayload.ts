import { CheckinTypeEnum } from "../CheckinTypeEnum";

export interface IQRCodeCheckinAPIPayload {
  abhyasiId: string;
  batch: string;
  berthPreference: string;
  dormAndBerthAllocation: string;
  dormPreference: string;
  eventName: string;
  fullName: string;
  orderId: string;
  pnr: string;
  registrationId: string;
  //
  timestamp: number;
  type: CheckinTypeEnum;
}
