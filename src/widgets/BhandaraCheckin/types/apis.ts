import { AbhyasiCheckinData, CheckinEmailOrMobileUserDetails } from "./index";

export interface CheckinWithEmailOrMobileApi {
  (userDetails: CheckinEmailOrMobileUserDetails): Promise<boolean>;
}

export interface CheckinAbhyasiApi {
  (abhyasiId: string): Promise<boolean>;
}

export type OfflineCacheData =
  | CheckinEmailOrMobileUserDetails
  | AbhyasiCheckinData;

export interface GetDataFromCacheApi {
  (): Promise<OfflineCacheData[] | false>;
}

export interface IsAbhyasiCheckedInApi {
  (abhyasiId: string): Promise<boolean>;
}

export interface IsUserAlreadyCheckedInApi {
  (user: CheckinEmailOrMobileUserDetails): Promise<boolean>;
}

export type BhandaraCheckinAPIs = {
  checkinAbhyasi: CheckinAbhyasiApi;
  checkinWithEmailOrMobile: CheckinWithEmailOrMobileApi;
  getDataFromCache: GetDataFromCacheApi;
  isAbhyasiCheckedIn: IsAbhyasiCheckedInApi;
  isUserAlreadyCheckedIn: IsUserAlreadyCheckedInApi;
};
