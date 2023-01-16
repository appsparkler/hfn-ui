import { NOT_FOUND } from "redux-first-router";
import { PageEnum } from "widgets/BhandaraCheckin/types";

const actionTypeToComponentsMap: Record<string, PageEnum> = {
  HOME: PageEnum.Home,
  UPDATE_DETAILS: PageEnum.UpdateDetails,
  MULTI_CHECKIN_SCREEN: PageEnum.MultiCheckinScreen,
  ABHYASI_ID_CHECKIN_SCREEN: PageEnum.AbhyasiIdCheckinScreen,
  CHECKIN_SUCCESS: PageEnum.CheckInSuccess,
  REFRESH_APP: PageEnum.RefreshApp,
  [NOT_FOUND]: PageEnum.NotFound,
};

export const pageReducer = (state = "Home", { type } = { type: "HOME" }) =>
  actionTypeToComponentsMap[type] || state;
