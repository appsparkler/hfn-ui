import { connect, MapStateToProps } from "react-redux";
import { BhandaraCheckinViewStateProps } from "widgets/BhandaraCheckin/types";
import { RootState } from "../../store";
import { BhandaraCheckinView } from "./BhandaraCheckinView";

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
