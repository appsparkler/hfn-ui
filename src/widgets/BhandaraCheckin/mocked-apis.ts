import { some } from "lodash/fp";
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

  isMobileOrEmailUserCheckedIn: ({ fullName, email, mobile }) =>
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
          resolve(
            someUserWithEmailCheckedIn(email, fullName)(checkedInUsersData)
          );
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
          resolve(
            someUserWithMobileCheckedIn(mobile, fullName)(checkedInUsersData)
          );
        }
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
