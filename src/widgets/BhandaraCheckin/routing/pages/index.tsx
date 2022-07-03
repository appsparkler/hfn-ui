import {
  SectionCheckinSuccessConnected,
  SectionMainConnectedV2,
  SectionUpdateDetailsConnected,
} from "widgets/BhandaraCheckin/components";
import { Page } from "widgets/BhandaraCheckin/types";

export const pages: Page = {
  Home: SectionMainConnectedV2,
  UpdateDetails: SectionUpdateDetailsConnected,
  CheckInSuccess: SectionCheckinSuccessConnected,
  NotFound: () => <div>404</div>,
};
