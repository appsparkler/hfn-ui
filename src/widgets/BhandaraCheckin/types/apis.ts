import { AbhyasiCheckinData, CheckinEmailOrMobileUserDetails } from "./index";

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

export type OfflineCacheData = Record<
  string,
  CheckinEmailOrMobileUserDetails | AbhyasiCheckinData
>;

export interface GetDataFromCacheApi {
  (): Promise<OfflineCacheData | false>;
}
