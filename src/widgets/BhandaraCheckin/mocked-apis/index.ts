import { some } from "lodash/fp";
import {
  BhandaraCheckinAPIs,
  UserWithEmail,
  UserWithEmailAndMobile,
  UserWithMobile,
} from "../types";
import { fetchUserDetails } from "./server-apis";
import { init } from "./init";

const checkedInAbhyasis = ["INAAAE478"];

init();

const checkedInUsersData: (
  | UserWithEmail
  | UserWithMobile
  | UserWithEmailAndMobile
)[] = [];

export const mockedApis: BhandaraCheckinAPIs = {
  isAbhyasiCheckedIn: ($id: string) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const isCheckedIn = some<string>((id) => $id === id)(checkedInAbhyasis);
        if (isCheckedIn) resolve(true);
        resolve(false);
      }, 600);
    }),

  getAbhyasiData: async (abhyasiId: string) => {
    try {
      const res = await fetchUserDetails(abhyasiId);
      // const res = {
      //   id: 203146,
      //   name: "Jody Wohlert",
      //   ref: "I******7",
      //   record_type: "a",
      //   // city: null,
      //   city: "Hyderabad",
      //   // email: "j********t@mailinator.com",
      //   email: "",
      //   mobile: "+91****50",
      //   // mobile: "",
      //   firebase_uid: "",
      //   gender: "*",
      //   year_of_joining: "1982",
      //   age_group: "50-55",
      // };
      return {
        abhyasiId: res.ref,
        ageGroup: res.age_group,
        email: res.email,
        fullName: res.name,
        gender: res.gender,
        location: res.city,
        mobile: res.mobile,
      };
    } catch (error) {
      throw new Error(`Abhyas with ID ${abhyasiId} not found.`);
    }
  },

  isMobileOrEmailUserCheckedIn: ({ fullName, email, mobile }) =>
    new Promise((resolve) => {
      setTimeout(() => {
        const someUserWithEmailOrMobileAreCheckedIn = (
          email: string | undefined,
          mobile: string | undefined,
          fullName: string
        ) =>
          some<UserWithEmailAndMobile | UserWithEmail | UserWithMobile>(
            (user) =>
              ((user as UserWithEmail).email === email ||
                (user as UserWithMobile).mobile === mobile) &&
              user.fullName === fullName
          );
        resolve(
          someUserWithEmailOrMobileAreCheckedIn(
            email,
            mobile,
            fullName
          )(checkedInUsersData)
        );
      }, 600);
    }),

  checkinMobileOrEmailUser: (user) =>
    new Promise((resolve) => {
      setTimeout(() => {
        checkedInUsersData.push(user);
        resolve(true);
      }, 600);
    }),
};
