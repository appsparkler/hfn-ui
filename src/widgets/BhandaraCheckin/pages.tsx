import { ConnectedComponent } from "react-redux";
import { SectionCheckinSuccessConnected } from "./SectionCheckinSuccess/SectionCheckInSuccessConnected";
import { SectionMainConnectedV2 } from "./SectionMain/SectionMainConnectedV2";
import { SectionUpdateDetailsConnected } from "./SectionUpdateDetails/SectionUpdateDetailsConnectedV2";

export type Pages = {
  NotFound: () => JSX.Element;
  Home: ConnectedComponent<any, any>;
  UpdateDetails: ConnectedComponent<any, any>;
  CheckInSuccess: ConnectedComponent<any, any> | (() => JSX.Element);
};

export const pages: Pages = {
  Home: SectionMainConnectedV2,
  UpdateDetails: SectionUpdateDetailsConnected,
  CheckInSuccess: SectionCheckinSuccessConnected,
  NotFound: () => <div>404</div>,
};
