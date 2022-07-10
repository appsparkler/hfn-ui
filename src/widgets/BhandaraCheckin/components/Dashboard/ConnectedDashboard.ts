import { connect, MapStateToProps } from "react-redux";
import { RootState } from "widgets/BhandaraCheckin/store";
import { Dashboard } from "./Dashboard";
import { DashboardStateProps } from "widgets/BhandaraCheckin/types";
import { mapDashboardDispatchToProps } from "widgets/BhandaraCheckin/store/actions/mapDashboardDispatchToProps";

export const mapStateToProps: MapStateToProps<
  DashboardStateProps,
  {},
  RootState
> = ({ dashboard }) => dashboard;

export const DashboardConnected = connect(
  mapStateToProps,
  mapDashboardDispatchToProps
)(Dashboard);
