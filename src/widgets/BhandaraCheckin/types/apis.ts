import {
  CheckinEmailOrMobileUserDetails,
  CheckinsAggregateData,
  IAbhyasiCheckinApiStoreData,
} from "@hfn-checkins/types";
import { UserCredential } from "firebase/auth";
import { noop } from "lodash/fp";

export interface CheckinWithEmailOrMobileApi {
  (userDetails: CheckinEmailOrMobileUserDetails): boolean;
}

export interface CheckinAbhyasiApi {
  (abhyasiId: string): boolean;
}

export type OfflineCacheData =
  | CheckinEmailOrMobileUserDetails
  | IAbhyasiCheckinApiStoreData;

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
  signInAnonymously: () => Promise<void>;
  signOutAnonymously: typeof noop;
};
