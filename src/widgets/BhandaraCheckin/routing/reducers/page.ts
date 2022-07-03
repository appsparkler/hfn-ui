import { NOT_FOUND } from "redux-first-router";
import { PageEnum } from "widgets/BhandaraCheckin/types";

const actionTypeToComponentsMap: Record<string, PageEnum> = {
  HOME: PageEnum.Home,
  UPDATE_DETAILS: PageEnum.UpdateDetails,
  CHECKIN_SUCCESS: PageEnum.CheckInSuccess,
  [NOT_FOUND]: PageEnum.NotFound,
};

export const pageReducer = (state = "Home", { type } = { type: "HOME" }) =>
  actionTypeToComponentsMap[type] || state;
