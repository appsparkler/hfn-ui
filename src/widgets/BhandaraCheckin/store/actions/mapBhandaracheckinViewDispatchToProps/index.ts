import { MapDispatchToProps } from "react-redux";
import { getDashboardData } from "widgets/BhandaraCheckin/store/api-async-thunks";
import { HOME } from "widgets/BhandaraCheckin/routing/actions/page";
import { DashboardDispatchProps } from "widgets/BhandaraCheckin/types";
import { dashboardActions } from "../../slices";

export const mapBhandaraCheckinViewDispatchToProps: MapDispatchToProps<
  DashboardDispatchProps,
  {}
> = (dispatch) => {
  return {
    onReturn: () => {
      dispatch(HOME());
    },
    onRefresh: async () => {
      dispatch(dashboardActions.fetchStart());
      const res = await dispatch<any>(getDashboardData());
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(dashboardActions.updateStats(res.payload));
      }
      dispatch(dashboardActions.fetchEnd());
    },
    onMount: async () => {
      dispatch(dashboardActions.fetchStart());
      const res = await dispatch<any>(getDashboardData());
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(dashboardActions.updateStats(res.payload));
      }
      dispatch(dashboardActions.fetchEnd());
    },
  };
};

// const auth = getAuth();
// signInAnonymously(auth)
//   .then(({ user }) => {
//     console.log(user);
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.error(errorCode, errorMessage);
//   });

// return () => {
//   signOut(auth);
// };
