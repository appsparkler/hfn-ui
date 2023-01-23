import {
  ConnectedAbhyasiIdCheckinScreen,
  ConnectedDashboard,
  ConnectedMultiCheckinScreen,
  ConnectedRefreshApp,
  SectionCheckinSuccessConnected,
  SectionMainConnected,
  SectionUpdateDetailsConnected,
} from "widgets/BhandaraCheckin/components";
import { Page } from "widgets/BhandaraCheckin/types";

export const pages: Page = {
  Home: SectionMainConnected,
  UpdateDetails: SectionUpdateDetailsConnected,
  CheckInSuccess: SectionCheckinSuccessConnected,
  RefreshApp: ConnectedRefreshApp,
  NotFound: () => <div>404</div>,
  MultiCheckinScreen: ConnectedMultiCheckinScreen,
  AbhyasiIdCheckinScreen: ConnectedAbhyasiIdCheckinScreen,
  Dashboard: ConnectedDashboard,
};
