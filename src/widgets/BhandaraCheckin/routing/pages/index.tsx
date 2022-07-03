import {
  SectionCheckinSuccessConnected,
  SectionMainConnected,
  SectionUpdateDetailsConnected,
} from "widgets/BhandaraCheckin/components";
import { Page } from "widgets/BhandaraCheckin/types";

export const pages: Page = {
  Home: SectionMainConnected,
  UpdateDetails: SectionUpdateDetailsConnected,
  CheckInSuccess: SectionCheckinSuccessConnected,
  NotFound: () => <div>404</div>,
};
