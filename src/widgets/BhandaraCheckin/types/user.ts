type EmailOrMobileDetail =
  | { mobile: string }
  | { email: string }
  | { email: string; mobile: string };

export type CheckinEmailOrMobileUserDetails = {
  fullName: string;
  ageGroup: string;
  gender: string;
  city: string;
  state: string;
  country: string;
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
