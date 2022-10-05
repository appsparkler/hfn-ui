import { connect, MapStateToProps } from "react-redux";
import { RootState } from "../../store";
import { BhandaraCheckinView } from "./BhandaraCheckinView";
import { BhandaraCheckinViewStateProps } from "widgets/BhandaraCheckin/types";
import { mapBhandaraCheckinViewDispatchToProps } from "widgets/BhandaraCheckin/store/actions/mapBhandaracheckinViewDispatchToProps";

const mapStateToProps: MapStateToProps<
  BhandaraCheckinViewStateProps,
  {},
  RootState
> = ({ bhandaraCheckin, page }) => ({
  ...bhandaraCheckin,
  page,
});

export const BhandaraCheckinViewConnected = connect(
  mapStateToProps,
  mapBhandaraCheckinViewDispatchToProps
)(BhandaraCheckinView);
