import { BhandaraCheckinAPIs } from "widgets/BhandaraCheckin/types";
import { checkinAbhyasi } from "./checkinAbhyasi";
import { checkinWithEmailOrMobile } from "./checkinWithEmailorMobile";
import { checkinWithQRCode } from "./checkinWithQRCode";
import { getAppVersion } from "./getAppVersion";
import { getDashboardData } from "./getDashboardData";
import { getDataFromCache } from "./getDataFromCache";
import { isAbhyasiCheckedIn } from "./isAbhyasiCheckedIn";
import { isUserAlreadyCheckedIn } from "./isUserAlreadyCheckinIn";
import { signInAnonymously } from "./signInAnonymously";
import { signOutAnonymously } from "./signOutAnonymously";

export const apis: BhandaraCheckinAPIs = {
  checkinAbhyasi,
  checkinWithEmailOrMobile,
  checkinWithQRCode,
  getDataFromCache,
  isAbhyasiCheckedIn,
  isUserAlreadyCheckedIn,
  getDashboardData,
  getAppVersion,
  signInAnonymously,
  signOutAnonymously,
};
