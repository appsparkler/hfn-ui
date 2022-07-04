import { MapDispatchToProps } from "react-redux";
import { HOME } from "widgets/BhandaraCheckin/routing/actions/page";
import { OfflineDataDispatchProps } from "widgets/BhandaraCheckin/types/components/OfflineData";
import { getOfflineData } from "../../api-async-thunks/getOfflineData";
import { offlineDataActions } from "../../slices/offlineData";

export const mapOfflineDataDispatchToProps: MapDispatchToProps<
  OfflineDataDispatchProps,
  {}
> = (dispatch) => {
  return {
    onReturn: () => {
      dispatch(HOME());
    },
    onRefresh: async () => {
      const res = await dispatch<any>(getOfflineData());
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(offlineDataActions.update(res.payload));
      }
    },
    onMount: async () => {
      const res = await dispatch<any>(getOfflineData());
      if (res.meta.requestStatus === "fulfilled") {
        dispatch(offlineDataActions.update(res.payload));
      }
    },
  };
};
