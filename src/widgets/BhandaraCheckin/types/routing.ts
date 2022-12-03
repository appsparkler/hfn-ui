import { ConnectedComponent } from "react-redux";

export enum PageEnum {
  Home = "Home",
  UpdateDetails = "UpdateDetails",
  CheckInSuccess = "CheckInSuccess",
  OfflineData = "OfflineData",
  NotFound = "NotFound",
  Dashboard = "Dashboard",
  RefreshApp = "RefreshApp",
  MultiCheckinScreen = "MultiCheckinScreen",
  AbhyasiIdCheckinScreen = "AbhyasiIdCheckinScreen",
}

export type Page = Record<
  PageEnum,
  JSX.Element | Element | ConnectedComponent<any, any> | (() => JSX.Element)
>;
