import {
  SectionCheckinSuccessConnected,
  SectionMainConnectedV2,
  SectionUpdateDetailsConnected,
} from "widgets/BhandaraCheckinV2/components";
import { Page } from "widgets/BhandaraCheckinV2/types";

export const pages: Page = {
  Home: SectionMainConnectedV2,
  UpdateDetails: SectionUpdateDetailsConnected,
  CheckInSuccess: SectionCheckinSuccessConnected,
  NotFound: () => <div>404</div>,
};
