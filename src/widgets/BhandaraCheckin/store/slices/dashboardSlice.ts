import { createSlice } from "@reduxjs/toolkit";
import {
  CheckinsAggregateData,
  DashboardStateProps,
} from "widgets/BhandaraCheckin/types";
import { getEnv } from "widgets/BhandaraCheckin/utils";

const getInitialState = (): DashboardStateProps => ({
  password: getEnv().DASHBOARD_PASSWORD,
  total: 0,
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: getInitialState(),
  reducers: {
    updateTotal: (state, { payload }: { payload: CheckinsAggregateData }) => {
      state.total = payload.emailOrMobileCheckin + payload.abhyasiIdCheckin;
    },
  },
});

export const {
  actions: dashboardActions,
  getInitialState: getDashboardInitialState,
  name: dashboardName,
  reducer: dashboardReducer,
} = dashboardSlice;
