import { some } from "lodash/fp";
import {
  BhandaraCheckinAPIs,
  UserWithEmail,
  UserWithEmailAndMobile,
  UserWithMobile,
} from "../types";
import {
  attendanceExists,
  checkinUser,
  fetchUserDetails,
  postAttendance,
  searchUser,
} from "./server-apis";
import { init } from "./init";

const checkedInAbhyasis = ["INAAAE478"];

init();

const checkedInUsersData: (
  | UserWithEmail
  | UserWithMobile
  | UserWithEmailAndMobile
)[] = [];

export const mockedApis: BhandaraCheckinAPIs = {
  attendanceExists: attendanceExists,
  postAttendance: postAttendance,
  searchUser: searchUser,

  // previous
  isAbhyasiCheckedIn: ($id: string) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        const upperCaseId = $id.toUpperCase();
        const isCheckedIn = some<string>((id) => upperCaseId === id)(
          checkedInAbhyasis
        );
        if (isCheckedIn)
          reject(
            new Error(`Abhyasi with ${upperCaseId} has already checked in.`)
          );
        else resolve(true);
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
    new Promise((resolve, reject) => {
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
        const isCheckedIn = someUserWithEmailOrMobileAreCheckedIn(
          email,
          mobile,
          fullName
        )(checkedInUsersData);
        if (isCheckedIn) {
          reject(new Error(`User has already checked in.`));
        } else resolve(isCheckedIn);
      }, 600);
    }),

  checkinAbhyasi: async (user) => {
    const res = await checkinUser(user);
    console.log({ res });
    debugger;
    return true;
  },

  // checkinAbhyasi: (user) =>
  //   new Promise((resolve, reject) => {
  //     setTimeout(() => {
  //       const isAbhyasiCheckedIn = some<string>(
  //         (userId) => userId === user.abhyasiId
  //       )(checkedInAbhyasis);
  //       if (isAbhyasiCheckedIn) {
  //         reject(
  //           new Error(`Abhyasi with ID ${user.abhyasiId} is already checked in`)
  //         );
  //       } else {
  //         resolve(true);
  //       }
  //       if (user.abhyasiId) {
  //         checkedInAbhyasis.push(user.abhyasiId);
  //       }
  //     }, 600);
  //   }),

  checkinMobileOrEmailUser: (user) =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        // if (random(1)(2) === 1) {
        checkedInUsersData.push(user);
        resolve(true);
        // } else {
        //   reject(new Error(`Could not checkin user. Please try again later.`));
        // }
      }, 600);
    }),
};
