import {
  CheckinEmailOrMobileUserDetails,
  ICheckinsAggregateData,
  IAbhyasiCheckinApiStoreData,
  IQRCheckinUser,
} from "@hfn-checkins/types";
import { noop } from "lodash/fp";

export interface CheckinWithEmailOrMobileApi {
  (userDetails: CheckinEmailOrMobileUserDetails): boolean;
}

export interface CheckinAbhyasiApi {
  (abhyasiId: string, dormAndBirthAllocation: string): boolean;
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
  (): Promise<ICheckinsAggregateData>;
}

export interface GetAppVersion {
  (): Promise<number>;
}

export type BhandaraCheckinAPIs = {
  checkinAbhyasi: CheckinAbhyasiApi;
  checkinWithEmailOrMobile: CheckinWithEmailOrMobileApi;
  getDataFromCache: GetDataFromCacheApi;
  isAbhyasiCheckedIn: IsAbhyasiCheckedInApi;
  isUserAlreadyCheckedIn: IsUserAlreadyCheckedInApi;
  getDashboardData: GetDashboardDataApi;
  getAppVersion: GetAppVersion;
  signInAnonymously: () => Promise<void>;
  signOutAnonymously: typeof noop;
  checkinWithQRCode: (users: IQRCheckinUser) => Promise<void>;
};
