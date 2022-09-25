import { connect, MapStateToProps } from "react-redux";
import { BhandaraCheckinStateProps } from "widgets/BhandaraCheckin/types";
import { mapBhandaraCheckinDispatchToProps, RootState } from "../../store";
import { BhandaraCheckinView } from "./BhandaraCheckinView";

const mapStateToProps: MapStateToProps<
  BhandaraCheckinStateProps,
  {},
  RootState
> = ({ bhandaraCheckin, page }) => ({
  ...bhandaraCheckin,
  page,
});

export const BhandaraCheckinViewConnected = connect(
  mapStateToProps,
  mapBhandaraCheckinDispatchToProps
)(BhandaraCheckinView);
