import { MapDispatchToProps } from "react-redux";
import { getDashboardData } from "widgets/BhandaraCheckin/store/api-async-thunks";
import { HOME } from "widgets/BhandaraCheckin/routing/actions/page";
import { DashboardV0DispatchProps } from "widgets/BhandaraCheckin/types";
import { dashboardActions } from "../../slices";

export const mapDashboardDispatchToProps: MapDispatchToProps<
  DashboardV0DispatchProps,
  {}
> = (dispatch) => {
  return {
    onReturn: () => {
      dispatch(HOME());
    },
    onRefresh: async () => {
      const res = await dispatch<any>(getDashboardData());
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(dashboardActions.updateStats(res.payload));
      }
    },
    onMount: async () => {
      const res = await dispatch<any>(getDashboardData());
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(dashboardActions.updateStats(res.payload));
      }
    },
  };
};
