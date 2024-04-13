import { CheckinType } from "v1/model/data/checkinTypes";

export interface IEmailOrMobileCheckinAPIPayload {
  batch: string;
  fullName: string;
  ageGroup: string;
  gender: string;
  city: string;
  state: string;
  country: string;
  mobile: string;
  email: string;
  dormAndBerthAllocation: string;

  type: CheckinType;
  timestamp: number;
}
