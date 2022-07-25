import { connect, MapStateToProps } from "react-redux";
import { RootState } from "widgets/BhandaraCheckin/store";
import { DashboardV0 } from "./Dashboard";
import { DashboardV0StateProps } from "widgets/BhandaraCheckin/types";
import { mapDashboardDispatchToProps } from "widgets/BhandaraCheckin/store/actions/mapDashboardDispatchToProps";

export const mapStateToProps: MapStateToProps<
  DashboardV0StateProps,
  {},
  RootState
> = ({ dashboard }) => dashboard;

export const DashboardConnected = connect(
  mapStateToProps,
  mapDashboardDispatchToProps
)(DashboardV0);
