import { createAsyncThunk } from "@reduxjs/toolkit";
import { MapDispatchToProps } from "react-redux";
import {
  DashboardComponentDispatchProps,
  ThunkApiConfig,
} from "widgets/BhandaraCheckin/types";

const handleRefreshData = createAsyncThunk<void, void, ThunkApiConfig>(
  "dashboard/refreshData",
  async (_, thunkApi) => {
    const {
      apis: { updateMetadata, getMetadata },
    } = thunkApi.extra;
    await updateMetadata();
    await getMetadata();
  }
);

export const dashboardMapDispatchToProps: MapDispatchToProps<
  DashboardComponentDispatchProps,
  {}
> = (dispatch) => ({
  onMount: () => dispatch<any>(handleRefreshData()),
  onClickRefresh: () => dispatch<any>(handleRefreshData()),
});
