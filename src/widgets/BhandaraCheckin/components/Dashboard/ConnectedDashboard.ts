import { dashboardMapDispatchToProps } from "../../store/actions/dashboardMapDispatchToProps";
import { Dashboard } from "./Dashboard";
import { connect, MapStateToProps } from "react-redux";
import { DashboardComponentStateProps } from "widgets/BhandaraCheckin/types";
import { RootState } from "widgets/BhandaraCheckin/store";

const mapStateToProps: MapStateToProps<
  DashboardComponentStateProps,
  {},
  RootState
> = (state) => state.dashboard;

export const ConnectedDashboard = connect(
  mapStateToProps,
  dashboardMapDispatchToProps
)(Dashboard);
