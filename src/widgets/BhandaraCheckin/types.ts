import { RefinedCityStateCountryLocation } from "../../components/LocationTextField/locations";

export enum CurrentSectionEnum {
  MAIN,
  UPDATE_DETAILS,
  CHECKIN_SUCCESS,
}

export type UserSRCM = {
  id: number;
  name: string;
  ref: string;
  record_type: string;
  city: string;
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
// (
//   | { email: boolean }
//   | { mobile: boolean }
//   | { email: boolean; mobile: boolean }
// );

export type UserDetailsValueWrapper<T> = {
  show?: boolean;
  isValid?: boolean;
  value?: T;
  disabled?: boolean;
};

export type UserDetails = {
  fullName: UserDetailsValueWrapper<string>;
  mobile: UserDetailsValueWrapper<string>;
  email: UserDetailsValueWrapper<string>;
  location: UserDetailsValueWrapper<RefinedCityStateCountryLocation>;
  ageGroup: UserDetailsValueWrapper<string>;
  gender: UserDetailsValueWrapper<string>;
};

// const user: User = {
//   id: "id",
//   ageGroup: "19-209",
//   email: "abc@def.com",
//   fullName: "ABC DEF",
//   gender: "MALE",
//   location: "ABC",
//   mobile: "39393939",
// };

export type AbhyasiAPI = {
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
  firebase_uid: string;
  gender: string;
  year_of_joining: string;
  age_group: string;
};

// const user = [
//   {
//     id: 83635,
//     name: "AJAY KUMAR CHINTA",
//     ref: "I******1",
//     record_type: "a",
//     city: { id: 73902, name: "Hyderabad" },
//     email: "c********2@gmail.com",
//     mobile: "+91****46",
//     firebase_uid: "BJt1sraT4OgMzSIzCcdKyXWFca22",
//     gender: "*",
//     year_of_joining: "1998",
//     age_group: "40-45",
//   },
// ];

export type BhandaraCheckinAPIs = {
  checkinMobileOrEmailUser: (
    user: UserWithEmail | UserWithMobile | UserWithEmailAndMobile
  ) => Promise<boolean>;
  checkinAbhyasi: (user: User) => Promise<boolean>;
  isMobileOrEmailUserCheckedIn: ({
    fullName,
    email,
    mobile,
  }: {
    fullName: string;
    email?: string;
    mobile?: string;
  }) => Promise<boolean>;
  isAbhyasiCheckedIn: (userId: string) => Promise<boolean>;
  getAbhyasiData: (
    userId: string
  ) => Promise<UserWithEmail | UserWithMobile | UserWithEmailAndMobile>;
};
