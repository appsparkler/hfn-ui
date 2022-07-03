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

export type MobileOrEmailUser = {
  fullName: string;
  email?: string | undefined;
  mobile?: string | undefined;
};

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
