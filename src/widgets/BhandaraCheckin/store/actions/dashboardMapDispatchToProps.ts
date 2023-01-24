import { MapDispatchToProps } from "react-redux";
import { DashboardComponentDispatchProps } from "widgets/BhandaraCheckin/types";
import { updateMetadata } from "../api-async-thunks";
import { dashboardActions } from "../slices";

export const dashboardMapDispatchToProps: MapDispatchToProps<
  DashboardComponentDispatchProps,
  {}
> = (dispatch) => ({
  onMount: async () => {
    const response = await dispatch<any>(updateMetadata());
    if (response.meta.requestStatus === "fulfilled") {
      const { emailOrMobileCheckins, QRCodeCheckins, abhyasiIdCheckins } =
        response.payload;
      const totalCheckins =
        emailOrMobileCheckins + QRCodeCheckins + abhyasiIdCheckins;
      dispatch(dashboardActions.setTotalCheckins(totalCheckins));
    }
  },
  onClickRefresh: () => dispatch<any>(updateMetadata()),
});
