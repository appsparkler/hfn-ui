import { createAsyncThunk } from "@reduxjs/toolkit";
import { sum, values } from "lodash/fp";
import { MapDispatchToProps } from "react-redux";
import { HOME } from "widgets/BhandaraCheckin/routing/actions/page";
import {
  DashboardComponentDispatchProps,
  ThunkApiConfig,
} from "widgets/BhandaraCheckin/types";
import { getMetadataAsyncThunk, updateMetadata } from "../api-async-thunks";
import { dashboardActions } from "../slices";

const handleRefreshData = createAsyncThunk<void, void, ThunkApiConfig>(
  "dashboard/handleRefreshData",
  async (_, { dispatch }) => {
    const password = prompt("Enter Password:");
    if (password !== process.env.REACT_APP_REFRESH_PASSWORD) return;
    const response = await dispatch(updateMetadata());
    if (response.meta.requestStatus === "fulfilled") {
      const totalCheckins = sum(values(response.payload));
      dispatch(dashboardActions.setTotalCheckins(totalCheckins));
    } else if (response.meta.requestStatus === "rejected") {
    }
  }
);

const handleMount = createAsyncThunk<void, void, ThunkApiConfig>(
  "dashboard/handleMount",
  async (_, { dispatch }) => {
    const response = await dispatch(getMetadataAsyncThunk());
    if (response.meta.requestStatus === "fulfilled") {
      const totalCheckins = sum(values(response.payload));
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
  onMount: () => dispatch<any>(handleMount()),
});
