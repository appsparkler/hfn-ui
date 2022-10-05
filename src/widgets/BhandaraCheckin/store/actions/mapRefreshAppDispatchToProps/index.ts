import { MapDispatchToProps } from "react-redux";
import { HOME } from "widgets/BhandaraCheckin/routing/actions/page";
import { RefreshAppDispatchProps } from "widgets/BhandaraCheckin/types";
import { refreshApp } from "../utils";

export const mapRefreshAppDispatchToProps: MapDispatchToProps<
  RefreshAppDispatchProps,
  {}
> = (dispatch) => {
  return {
    onCancel: () => {
      dispatch(HOME());
    },
    onRefresh: async () => {
      if (navigator.onLine) {
        await refreshApp(dispatch);
      } else {
        alert("You do not seem to have a stable internet connection.");
      }
    },
  };
};
