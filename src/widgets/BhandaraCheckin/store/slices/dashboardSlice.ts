import { createSlice } from "@reduxjs/toolkit";
import { DashboardStateProps } from "widgets/BhandaraCheckin/types";

const getInitialState = (): DashboardStateProps => ({
  password: "DesigningDestiny",
  total: 0,
});

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: getInitialState(),
  reducers: {
    updateTotal: (state, { payload }) => {
      state.total = payload;
    },
  },
});

export const {
  actions: dashboardActions,
  getInitialState: getDashboardInitialState,
  name: dashboardName,
  reducer: dashboardReducer,
} = dashboardSlice;
