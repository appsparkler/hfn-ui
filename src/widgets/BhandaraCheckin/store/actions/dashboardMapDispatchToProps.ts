import { createAsyncThunk } from "@reduxjs/toolkit";
import { MapDispatchToProps } from "react-redux";
import { HOME } from "widgets/BhandaraCheckin/routing/actions/page";
import {
  DashboardComponentDispatchProps,
  ThunkApiConfig,
} from "widgets/BhandaraCheckin/types";
import { updateMetadata } from "../api-async-thunks";
import { dashboardActions } from "../slices";

const handleRefreshData = createAsyncThunk<void, void, ThunkApiConfig>(
  "dashboard/handleRefreshData",
  async (_, { dispatch }) => {
    const response = await dispatch(updateMetadata());
    if (response.meta.requestStatus === "fulfilled") {
      const { emailOrMobileCheckins, QRCodeCheckins, abhyasiIdCheckins } =
        response.payload;
      const totalCheckins =
        emailOrMobileCheckins + QRCodeCheckins + abhyasiIdCheckins;
      dispatch(dashboardActions.setTotalCheckins(totalCheckins));
    } else if (response.meta.requestStatus === "rejected") {
    }
  }
);

export const dashboardMapDispatchToProps: MapDispatchToProps<
  DashboardComponentDispatchProps,
  {}
> = (dispatch) => ({
  onRefresh: () => dispatch<any>(handleRefreshData()),
  onClickGoBack: () => dispatch(HOME()),
});
