import { BhandaraCheckinAPIs } from "widgets/BhandaraCheckin/types";
import { checkinAbhyasi } from "./checkinAbhyasi";
import { checkinWithEmailOrMobile } from "./checkinWithEmailorMobile";
import { getDataFromCache } from "./getDataFromCache";
import { isAbhyasiCheckedIn } from "./isAbhyasiCheckedIn";
import { isUserAlreadyCheckedIn } from "./isUserAlreadyCheckinIn";

export const apis: BhandaraCheckinAPIs = {
  checkinAbhyasi,
  checkinWithEmailOrMobile,
  getDataFromCache,
  isAbhyasiCheckedIn,
  isUserAlreadyCheckedIn,
};
