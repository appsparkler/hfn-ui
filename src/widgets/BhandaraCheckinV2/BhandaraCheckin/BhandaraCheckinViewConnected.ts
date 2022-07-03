import { connect, MapStateToProps } from "react-redux";
import { RootState } from "../store";
import {
  BhandaraCheckinView,
  BhandaraCheckinViewStateProps,
  LocationActionType,
} from "./BhandaraCheckinView";

const mapStateToProps: MapStateToProps<
  BhandaraCheckinViewStateProps,
  {},
  RootState
> = ({ bhandaraCheckin, location, page }) => ({
  ...bhandaraCheckin,
  locationActionType: location.type as LocationActionType,
  page,
});

export const BhandaraCheckinViewConnected =
  connect(mapStateToProps)(BhandaraCheckinView);
