import { RefinedCityStateCountryLocation } from "components/LocationTextField/locations";

export type UserSRCM = {
  id: number;
  name: string;
  ref: string;
  record_type: string;
  city: {
    id: number;
    name: string;
  };
  email: string;
  mobile: string;
  firebase_uid: null;
  gender: string;
  year_of_joining: string;
  age_group: string;
};

export type BaseUser = {
  abhyasiId?: string;
  fullName: string;
  ageGroup: string;
  location: string;
  gender: string;
};

export type UserWithMobile = BaseUser & { mobile: string };
export type UserWithEmail = BaseUser & { email: string };
export type UserWithEmailAndMobile = BaseUser & {
  email: string;
  mobile: string;
};

export type User = UserWithMobile | UserWithEmail | UserWithEmailAndMobile;
