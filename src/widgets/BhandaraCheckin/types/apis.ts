import { CheckinEmailOrMobileUserDetails } from "./un-sorted";

export interface CheckinWithEmailOrMobileApi {
  (userDetails: CheckinEmailOrMobileUserDetails): Promise<boolean>;
}

export interface CheckinAbhyasiApi {
  (abhyasiId: string): Promise<boolean>;
}

export type BhandaraCheckinAPIs = {
  checkinAbhyasi: CheckinAbhyasiApi;
  checkinWithEmailOrMobile: CheckinWithEmailOrMobileApi;
};
