import {
  ConnectedAbhyasiIdCheckinScreen,
  ConnectedMultiCheckinScreen,
  ConnectedRefreshApp,
  DashboardConnected,
  SectionCheckinSuccessConnected,
  SectionMainConnected,
  SectionUpdateDetailsConnected,
} from "widgets/BhandaraCheckin/components";
import { OfflineDataConnected } from "widgets/BhandaraCheckin/components/OfflineData/OfflineDataConnected";
import { Page } from "widgets/BhandaraCheckin/types";

export const pages: Page = {
  Home: SectionMainConnected,
  UpdateDetails: SectionUpdateDetailsConnected,
  CheckInSuccess: SectionCheckinSuccessConnected,
  OfflineData: OfflineDataConnected,
  Dashboard: DashboardConnected,
  RefreshApp: ConnectedRefreshApp,
  NotFound: () => <div>404</div>,
  MultiCheckinScreen: ConnectedMultiCheckinScreen,
  AbhyasiIdCheckinScreen: ConnectedAbhyasiIdCheckinScreen,
};
