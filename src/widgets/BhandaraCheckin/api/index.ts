import { BhandaraCheckinAPIs } from "widgets/BhandaraCheckin/types";
import { checkinAbhyasi } from "./checkinAbhyasi";
import { checkinWithEmailOrMobile } from "./checkinWithEmailorMobile";
import { getDataFromCache } from "./getDataFromCache";

export const apis: BhandaraCheckinAPIs = {
  checkinAbhyasi,
  checkinWithEmailOrMobile,
  getDataFromCache,
};
