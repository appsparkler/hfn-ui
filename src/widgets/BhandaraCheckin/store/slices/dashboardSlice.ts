import { createSlice } from "@reduxjs/toolkit";
import { initialStats } from "widgets/BhandaraCheckin/constants";
import {
  CheckinsAggregateData,
  DashboardStateProps,
} from "widgets/BhandaraCheckin/types";

const getInitialState = (): DashboardStateProps => ({
  stats: initialStats,
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: getInitialState(),
  reducers: {
    updateStats: (state, { payload }: { payload: CheckinsAggregateData }) => {
      state.stats = payload;
    },
  },
});

export const {
  actions: dashboardActions,
  getInitialState: getDashboardInitialState,
  name: dashboardName,
  reducer: dashboardReducer,
} = dashboardSlice;
