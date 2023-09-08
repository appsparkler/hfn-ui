import {
  Batch,
  CheckinEmailOrMobileUserDetails,
  IAbhyasiCheckinApiStoreData,
  IQRCheckinUser,
} from "widgets/BhandaraCheckin/types";
import { noop } from "lodash/fp";
import { ICheckinsMetaData } from "./firebase";

export interface CheckinWithEmailOrMobileApi {
  (userDetails: CheckinEmailOrMobileUserDetails, batch: Batch): boolean;
}

export interface CheckinAbhyasiApi {
  (
    abhyasiId: string,
    dormAndBerthAllocation: string,
    eventName: string,
    batch: Batch
  ): boolean;
}

export type OfflineCacheData =
  | CheckinEmailOrMobileUserDetails
  | IQRCheckinUser
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

export interface GetAppVersion {
  (): Promise<number>;
}

export type CheckinWithQRApi = (users: IQRCheckinUser[]) => void;

export type BhandaraCheckinAPIs = {
  checkinAbhyasi: CheckinAbhyasiApi;
  checkinWithEmailOrMobile: CheckinWithEmailOrMobileApi;
  getDataFromCache: GetDataFromCacheApi;
  isAbhyasiCheckedIn: IsAbhyasiCheckedInApi;
  isUserAlreadyCheckedIn: IsUserAlreadyCheckedInApi;
  getAppVersion: GetAppVersion;
  signInAnonymously: () => Promise<void>;
  signOutAnonymously: typeof noop;
  checkinWithQRCode: CheckinWithQRApi;
  updateMetadata: () => Promise<ICheckinsMetaData>;
  getMetadata: () => Promise<ICheckinsMetaData>;
};
