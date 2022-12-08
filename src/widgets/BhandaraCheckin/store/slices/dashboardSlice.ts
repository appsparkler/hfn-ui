import { ICheckinsAggregateData } from "@hfn-checkins/types";
import { createSlice } from "@reduxjs/toolkit";
import { initialStats } from "widgets/BhandaraCheckin/constants";
import { DashboardStateProps } from "widgets/BhandaraCheckin/types";

const getInitialState = (): DashboardStateProps => ({
  stats: initialStats,
  isFetching: false,
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: getInitialState(),
  reducers: {
    updateStats: (state, { payload }: { payload: ICheckinsAggregateData }) => {
      state.stats = payload;
    },
    fetchStart: (state) => {
      state.isFetching = true;
    },
    fetchEnd: (state) => {
      state.isFetching = false;
    },
  },
});

export const {
  actions: dashboardActions,
  getInitialState: getDashboardInitialState,
  name: dashboardName,
  reducer: dashboardReducer,
} = dashboardSlice;
