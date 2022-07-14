import { MapDispatchToProps } from "react-redux";
import { HOME } from "widgets/BhandaraCheckin/routing/actions/page";
import { RefreshAppDispatchProps } from "widgets/BhandaraCheckin/types";

export const mapRefreshAppDispatchToProps: MapDispatchToProps<
  RefreshAppDispatchProps,
  {}
> = (dispatch) => {
  return {
    onCancel: () => {
      dispatch(HOME());
    },
    onRefresh: () => {},
  };
};
