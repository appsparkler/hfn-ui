import { connect, MapStateToProps } from "react-redux";
import { RootState } from "../store";
import {
  BhandaraCheckinView,
  BhandaraCheckinViewStateProps,
} from "./BhandaraCheckinView";

const mapStateToProps: MapStateToProps<
  BhandaraCheckinViewStateProps,
  {},
  RootState
> = ({ bhandaraCheckin, page }) => ({
  ...bhandaraCheckin,
  page,
});

export const BhandaraCheckinViewConnected =
  connect(mapStateToProps)(BhandaraCheckinView);
