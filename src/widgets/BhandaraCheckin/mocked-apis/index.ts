import { some } from "lodash/fp";
import {
  BhandaraCheckinAPIs,
  UserWithEmail,
  UserWithEmailAndMobile,
  UserWithMobile,
} from "../types";
import { fetchUserDetails } from "./server-apis";
import { init } from "./init";

init();

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
        resolve(true);
      }, 600);
    }),
  getUserDetails: async () => {
    const res = await fetchUserDetails("INAAAE478");
    return {
      abhyasiId: res.ref,
      ageGroup: res.age_group,
      email: res.email,
      fullName: res.name,
      gender: res.gender,
      location: res.city,
      mobile: res.mobile,
    };
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
