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
