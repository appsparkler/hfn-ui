import {
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
  NotFound: () => <div>404</div>,
};
