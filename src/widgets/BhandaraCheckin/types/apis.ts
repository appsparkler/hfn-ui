import { CheckinsAggregateData } from "@hfn-checkins/types";
import { AbhyasiCheckinData, CheckinEmailOrMobileUserDetails } from "./index";

export interface CheckinWithEmailOrMobileApi {
  (userDetails: CheckinEmailOrMobileUserDetails): boolean;
}

export interface CheckinAbhyasiApi {
  (abhyasiId: string): boolean;
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

export interface GetDashboardDataApi {
  (): Promise<CheckinsAggregateData>;
}

export type BhandaraCheckinAPIs = {
  checkinAbhyasi: CheckinAbhyasiApi;
  checkinWithEmailOrMobile: CheckinWithEmailOrMobileApi;
  getDataFromCache: GetDataFromCacheApi;
  isAbhyasiCheckedIn: IsAbhyasiCheckedInApi;
  isUserAlreadyCheckedIn: IsUserAlreadyCheckedInApi;
  getDashboardData: GetDashboardDataApi;
};
