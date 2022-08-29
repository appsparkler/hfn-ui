import {
  CheckinEmailOrMobileUserDetails,
  CheckinTypesEnum,
} from "@hfn-checkins/types";

export type FormUserDetailsValueWrapper<T> = {
  show?: boolean;
  isValid?: boolean;
  value?: T;
  disabled?: boolean;
};

export type FormUserDetails = {
  fullName: FormUserDetailsValueWrapper<string>;
  mobile: FormUserDetailsValueWrapper<string>;
  email: FormUserDetailsValueWrapper<string>;
  city: FormUserDetailsValueWrapper<string>;
  state: FormUserDetailsValueWrapper<string>;
  country: FormUserDetailsValueWrapper<string>;
  ageGroup: FormUserDetailsValueWrapper<string>;
  gender: FormUserDetailsValueWrapper<string>;
};

export type AbhyasiCheckinData = {
  abhyasiId: string;
  timestamp: number;
  deviceId: string;
};

export type CheckinEmailOrMobileUserData = {
  timestamp: number;
  deviceId: string;
} & CheckinEmailOrMobileUserDetails;

export interface IAbhyasiCheckinApiStoreData {
  abhyasiId: string;
  deviceId: string;
  timestamp: number;
  type: CheckinTypesEnum.AbhyasiId;
}

export type CheckinWithEmailOrMobileApiStoreData =
  CheckinEmailOrMobileUserDetails & {
    deviceId: string;
    timestamp: number;
    type: CheckinTypesEnum.EmailOrMobile;
  };
