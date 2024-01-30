import { Batch } from "../components";

export enum CheckinTypesEnum {
  AbhyasiId = "ABHYASI_ID",
  EmailOrMobile = "MOBILE_OR_EMAIL",
  QR = "QR",
}

type EmailOrMobileDetail =
  | { mobile: string }
  | { email: string }
  | { email: string; mobile: string };

export type GenderType = "M" | "F" | "U";

export type CheckinEmailOrMobileUserDetails = {
  fullName: string;
  ageGroup: string;
  gender: GenderType;
  city: string;
  state: string;
  country: string;
  dormAndBerthAllocation: string;
  eventName: string;
} & EmailOrMobileDetail;

export interface IAbhyasiCheckinApiStoreData {
  abhyasiId: string;
  timestamp: number;
  type: CheckinTypesEnum.AbhyasiId;
  dormAndBerthAllocation: string;
  eventName: string;
  batch: Batch;
}

export type CheckinWithEmailOrMobileApiStoreData =
  CheckinEmailOrMobileUserDetails & {
    batch: Batch;
    timestamp: number;
    type: CheckinTypesEnum.EmailOrMobile;
    dormAndBerthAllocation: string;
    eventName: string;
  };

export type ICheckinWIthQRApiStoreData = {
  timestamp: number;
  regId: string;
  eventName: string;
  abhyasiId: string;
  pnr: string;
  fullName: string;
  dormPreference: string;
  berthPreference: string;
  dormAndBerthAllocation: string;
  type: CheckinTypesEnum.QR;
};

export type CheckinData =
  | IAbhyasiCheckinApiStoreData
  | CheckinWithEmailOrMobileApiStoreData;

export interface IQRCheckinUser {
  abhyasiId: string;

  batch: string;

  berthPreference: string;
  dormAndBerthAllocation: string;
  dormPreference: string;
  eventName: string;
  fullName: string;

  orderId: string;

  pnr: string;
  regId: string;

  timestamp: number;

  type: CheckinTypesEnum.QR;
}

export type MyType = "hello";
