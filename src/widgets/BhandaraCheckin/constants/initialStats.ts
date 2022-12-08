import { ICheckinsAggregateData } from "@hfn-checkins/types";

export const initialStats: ICheckinsAggregateData = {
  abhyasiIdCheckin: 0,
  checkinsWithEmail: 0,
  checkinsWithMobile: 0,
  checkinsWithEmailAndMobile: 0,
  city: {},
  country: {},
  state: {},
  emailOrMobileCheckin: 0,
  female: 0,
  male: 0,
  unspecified: 0,
  dataAppendedForPreviousCheckins: false,
};
