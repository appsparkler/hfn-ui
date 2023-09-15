import {
  Batch,
  CheckinTypesEnum,
  CheckinWithEmailOrMobileApiStoreData,
  IAbhyasiCheckinApiStoreData,
  IQRCheckinUser,
} from "widgets/BhandaraCheckin/types";
import { delay } from "lodash/fp";
import { BhandaraCheckinAPIs, ICheckinsMetaData } from "../types";

const APP_VERSION = 1;

const checkedInPeople: (
  | IAbhyasiCheckinApiStoreData
  | CheckinWithEmailOrMobileApiStoreData
  | IQRCheckinUser
)[] = [];

export const mockedApis: BhandaraCheckinAPIs = {
  checkinAbhyasi: (
    abhyasiId: string,
    dormAndBerthAllocation: string = "",
    eventName: string,
    batch: Batch
  ) => {
    const $user: IAbhyasiCheckinApiStoreData = {
      abhyasiId,
      timestamp: new Date().getTime(),
      type: CheckinTypesEnum.AbhyasiId,
      dormAndBerthAllocation,
      eventName,
      batch,
    };
    checkedInPeople.push($user as any);
    setTimeout(() => {
      console.log(JSON.stringify($user, null, 2));
    }, 1000);
    return true;
  },
  checkinWithEmailOrMobile: (userDetails) => {
    const $user = {
      ...userDetails,
      // deviceId: "mocked-device-id",
      timestamp: new Date().getTime(),
      type: CheckinTypesEnum.EmailOrMobile,
      updatedInReport: false,
    };
    checkedInPeople.push(
      $user as
        | CheckinWithEmailOrMobileApiStoreData
        | IAbhyasiCheckinApiStoreData
    );
    setTimeout(() => {
      console.log(JSON.stringify($user, null, 2));
    }, 1000);
    return true;
  },
  checkinWithQRCode: (qrCodeUsers) => {
    checkedInPeople.push(...qrCodeUsers);
    delay(2000, () => {
      console.log(JSON.stringify(qrCodeUsers, null, 2));
    });
  },
  getDataFromCache: () => {
    return Promise.resolve(checkedInPeople);
  },
  isAbhyasiCheckedIn: () => {
    return Promise.resolve(false);
  },
  isUserAlreadyCheckedIn: () => {
    return Promise.resolve(false);
  },
  getAppVersion: () => {
    return Promise.resolve(APP_VERSION);
  },
  signInAnonymously: () => {
    return Promise.resolve();
  },
  signOutAnonymously: () => {
    return Promise.resolve();
  },
  getMetadata: async () => ({} as ICheckinsMetaData),
  updateMetadata: async () => ({
    abhyasiIdCheckins: 0,
    emailOrMobileCheckins: 0,
    totalCheckins: 0,
    QRCodeCheckins: 0,
  }),
};
