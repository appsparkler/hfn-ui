import {
  CheckinTypesEnum,
  CheckinWithEmailOrMobileApiStoreData,
  IAbhyasiCheckinApiStoreData,
} from "@hfn-checkins/types";
import { BhandaraCheckinAPIs } from "../types";

const APP_VERSION = 1;

const checkedInPeople: (
  | IAbhyasiCheckinApiStoreData
  | CheckinWithEmailOrMobileApiStoreData
)[] = [];

export const mockedApis: BhandaraCheckinAPIs = {
  checkinAbhyasi: (abhyasiId: string, dormAndBirthAllocation: string = "") => {
    const $user = {
      abhyasiId,
      deviceId: "mocked-device-id",
      timestamp: new Date().getTime(),
      type: CheckinTypesEnum.AbhyasiId,
      updatedInReport: false,
      dormAndBirthAllocation,
    };
    checkedInPeople.push($user as any);
    setTimeout(() => {
      alert(JSON.stringify($user, null, 2));
    }, 1000);
    return true;
  },
  checkinWithEmailOrMobile: (userDetails) => {
    const $user = {
      ...userDetails,
      deviceId: "mocked-device-id",
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
      alert(JSON.stringify($user, null, 2));
    }, 1000);
    return true;
  },
  checkinWithQRCode: () => {},
  getDataFromCache: () => {
    return Promise.resolve(checkedInPeople);
  },
  isAbhyasiCheckedIn: () => {
    return Promise.resolve(false);
  },
  isUserAlreadyCheckedIn: () => {
    return Promise.resolve(false);
  },
  getDashboardData: () => {
    return Promise.resolve({
      total: 0,
      totalAbhyasis: 0,
      totalGuests: 0,
      totalGuestsCheckedIn: 0,
      totalAbhyasisCheckedIn: 0,
      totalCheckedIn: 0,
      emailOrMobileCheckin: 0,
      abhyasiIdCheckin: 0,
      city: {},
      state: {},
      country: {},
      checkinsWithEmail: 10,
      checkinsWithMobile: 10,
      checkinsWithEmailAndMobile: 10,
      male: 10,
      female: 10,
      dataAppendedForPreviousCheckins: false,
      unspecified: 10,
    });
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
};
