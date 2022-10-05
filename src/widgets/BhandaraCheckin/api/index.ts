import { getAuth, signInAnonymously, signOut } from "firebase/auth";
import { BhandaraCheckinAPIs } from "widgets/BhandaraCheckin/types";
import { checkinAbhyasi } from "./checkinAbhyasi";
import { checkinWithEmailOrMobile } from "./checkinWithEmailorMobile";
import { getDashboardData } from "./getDashboardData";
import { getDataFromCache } from "./getDataFromCache";
import { isAbhyasiCheckedIn } from "./isAbhyasiCheckedIn";
import { isUserAlreadyCheckedIn } from "./isUserAlreadyCheckinIn";

const auth = getAuth();

export const apis: BhandaraCheckinAPIs = {
  checkinAbhyasi,
  checkinWithEmailOrMobile,
  getDataFromCache,
  isAbhyasiCheckedIn,
  isUserAlreadyCheckedIn,
  getDashboardData,
  signInAnonymously: async () => {
    try {
      await signInAnonymously(auth);
    } catch (err) {
      const error = err as { code: number; message: string };
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
      throw new Error(errorMessage);
    }
  },
  signOutAnonymously: async () => {
    await signOut(auth);
  },
};
