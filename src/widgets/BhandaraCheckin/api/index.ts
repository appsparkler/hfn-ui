import { BhandaraCheckinAPIs } from "widgets/BhandaraCheckin/types";
import { mockedCheckinAbhyasi } from "./checkinAbhyasi";
import { mockedCheckinWithEmailOrMobile } from "./checkinWithEmailorMobile";

export const apis: BhandaraCheckinAPIs = {
  checkinAbhyasi: mockedCheckinAbhyasi,
  checkinWithEmailOrMobile: mockedCheckinWithEmailOrMobile,
};
