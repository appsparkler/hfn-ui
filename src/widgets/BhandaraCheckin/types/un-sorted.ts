import { RefinedCityStateCountryLocation } from "components/LocationTextField/locations";

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

export type UserDetailsV2 = {
  fullName: UserDetailsValueWrapper<string>;
  mobile: UserDetailsValueWrapper<string>;
  email: UserDetailsValueWrapper<string>;
  location: UserDetailsValueWrapper<string>;
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
export type SearchUserParams = {
  name?: string;
  ref?: string;
  email?: string;
  mobile?: string;
  city_id?: string;
  firebase_uid?: string;
  page?: number;
  page_size?: number;
};

export type PostAttendanceSuccess = {
  id: number;
  attendance_datetime: string;
  registration: {
    age_group: string;
    arrival_date: null;
    cancelled: null;
    city_id: number;
    communication_preference: number;
    create_date: string;
    created_by_user: null;
    departure_date: null;
    email: string;
    emergency_contact: null;
    emergency_mobile: null;
    emergency_relation: null;
    gender: null;
    has_registered: boolean;
    id: number;
    audit_log: never[];
    mobile: string;
    name: string;
    partner_id: null;
    ref: string;
    reg_json: {};
    status: string;
    stay_preference: null;
    write_date: string;
    reg_header: number;
    event_name: string;
    event_title: string;
    pnr: string;
  };
  session: {
    id: number;
    event: number;
    create_date: string;
    write_date: string;
    audit_log: never[];
    name: string;
    session_no: number;
    start_datetime: string;
    end_datetime: null;
  };
};

export type PostAttendanceUser = {
  name: string;
  ref?: string | null;
  email?: string | null;
  mobile?: string | null;
  attendance_datetime?: string;
  city_id?: number | null;
  age_group?: string | null;
  gender?: string | null;
};

export type PostAttendanceFailure = {
  detail: ["Attendance already exists."];
};

export type AttendanceExistsUser = {
  part_name?: string;
  mobile?: string;
  email?: string;
  ref?: string;
};

export type AttendanceExistsResponse = {
  attendance_exists: boolean;
  registration_exists: boolean;
};

export type SearchUserResponse = {
  count: number;
  next: null;
  previous: null;
  results: UserSRCM[];
};
