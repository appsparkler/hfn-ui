import { ConnectedComponent } from "react-redux";

export enum PageEnum {
  Home = "Home",
  UpdateDetails = "UpdateDetails",
  CheckInSuccess = "CheckInSuccess",
  NotFound = "NotFound",
}

export type Page = Record<
  PageEnum,
  JSX.Element | Element | ConnectedComponent<any, any> | (() => JSX.Element)
>;
