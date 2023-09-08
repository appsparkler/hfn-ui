import { Batch, CheckinTypesEnum } from "../types";

export interface QRCodeCheckin {
  abhyasiId: string;
  batch: Batch;
  berthPreference: string;
  checkin: boolean;
  dormAndBerthAllocation: string;
  dormPreference: string;
  eventName: string;
  fullName: string;
  orderId: string;
  pnr: string;
  regId: string;
  timestamp: number;
  type: CheckinTypesEnum;
}
