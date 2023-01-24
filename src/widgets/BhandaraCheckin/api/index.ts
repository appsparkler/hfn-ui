import { BhandaraCheckinAPIs } from "widgets/BhandaraCheckin/types";
import { checkinAbhyasi } from "./checkinAbhyasi";
import { checkinWithEmailOrMobile } from "./checkinWithEmailorMobile";
import { checkinWithQRCode } from "./checkinWithQRCode";
import { getAppVersion } from "./getAppVersion";
import { getDataFromCache } from "./getDataFromCache";
import { isAbhyasiCheckedIn } from "./isAbhyasiCheckedIn";
import { isUserAlreadyCheckedIn } from "./isUserAlreadyCheckinIn";
import { signInAnonymously } from "./signInAnonymously";
import { signOutAnonymously } from "./signOutAnonymously";
import { updateMetadata } from "./updateMetadata";

export const apis: BhandaraCheckinAPIs = {
  checkinAbhyasi,
  checkinWithEmailOrMobile,
  checkinWithQRCode,
  getDataFromCache,
  isAbhyasiCheckedIn,
  isUserAlreadyCheckedIn,
  getAppVersion,
  signInAnonymously,
  signOutAnonymously,
  updateMetadata,
};
