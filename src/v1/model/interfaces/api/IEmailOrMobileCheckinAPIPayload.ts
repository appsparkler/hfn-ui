import { CheckinTypeEnum } from "v1/model/interfaces/CheckinTypeEnum";

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

  type: CheckinTypeEnum;
  timestamp: number;
}
