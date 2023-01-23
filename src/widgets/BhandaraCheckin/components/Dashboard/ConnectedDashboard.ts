import { RootState } from "widgets/BhandaraCheckin/store";
import { Dashboard } from "./Dashboard";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  DashboardComponentDispatchProps,
  DashboardComponentStateProps,
} from "widgets/BhandaraCheckin/types";

const mapStateToProps: MapStateToProps<
  DashboardComponentStateProps,
  {},
  RootState
> = (state) => state.dashboard;

export const dashboardMapDispatchToProps: MapDispatchToProps<
  DashboardComponentDispatchProps,
  {}
> = (dispatch) => ({
  onMount: () => {},
  onClickRefresh: () => {},
});

export const ConnectedDashboard = connect(
  mapStateToProps,
  dashboardMapDispatchToProps
)(Dashboard);
