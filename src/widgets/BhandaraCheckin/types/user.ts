type EmailOrMobileDetail =
  | { mobile: string }
  | { email: string }
  | { email: string; mobile: string };

export type CheckinEmailOrMobileUserDetails = {
  name: string;
  ageGroup: string;
  gender: string;
  location: string;
} & EmailOrMobileDetail;

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
  location: FormUserDetailsValueWrapper<string>;
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
