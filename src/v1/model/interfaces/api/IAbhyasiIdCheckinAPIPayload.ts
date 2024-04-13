import { CheckinType } from "v1/model/data/checkinTypes";

export interface IAbhyasiIdCheckinAPIPayload {
  timestamp: number;
  abhyasiId: string;
  batch: string;
  dormAndBerthAllocation: string;
  eventName: string;
  type: CheckinType;
}
