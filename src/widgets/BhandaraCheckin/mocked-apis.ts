import { some, uniqueId } from "lodash/fp";
import {
  BhandaraCheckinAPIs,
  UserWithEmail,
  UserWithEmailAndMobile,
  UserWithMobile,
} from "./types";

const checkedInUsersData: (
  | UserWithEmail
  | UserWithMobile
  | UserWithEmailAndMobile
)[] = [
  {
    // id: uniqueId("checked-in-user"),
    mobile: "+918273048930",
    fullName: "Anurita Panday",
    ageGroup: "10-20",
    email: "anurita.pandey@gmail.com",
    gender: "female",
    location: "",
  },
];

export const mockedApis: BhandaraCheckinAPIs = {
  getIsUserCheckedIn: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(false);
      }, 600);
    }),

  getUserDetails: () =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          email: "abc@def.com",
          fullName: "Prakash Shah",
          gender: "Male",
          location: "Telangana, Hyderabad, India",
          ageGroup: "30-35",
        });
      }, 600);
    }),

  isMobileOrEmailUserCheckedIn: async ({ fullName, email, mobile }) =>
    new Promise((resolve) => {
      setTimeout(() => {
        if (email) {
          const someUserWithEmailCheckedIn = (
            email: string,
            fullName: string
          ) =>
            some<UserWithEmailAndMobile | UserWithEmail | UserWithMobile>(
              (user) =>
                (user as UserWithEmail).email === email &&
                user.fullName === fullName
            );
          if (someUserWithEmailCheckedIn(email, fullName)(checkedInUsersData))
            resolve(true);
          else resolve(false);
        } else if (mobile) {
          const someUserWithMobileCheckedIn = (
            mobile: string,
            fullName: string
          ) =>
            some<UserWithEmailAndMobile | UserWithEmail | UserWithMobile>(
              (user) =>
                (user as UserWithMobile).mobile === mobile &&
                user.fullName === fullName
            );
          if (someUserWithMobileCheckedIn(mobile, fullName)(checkedInUsersData))
            resolve(true);
          else resolve(false);
        }
      }, 600);
    }),

  checkinMobileOrEmailUser: async (user) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 600);
    }),
};
