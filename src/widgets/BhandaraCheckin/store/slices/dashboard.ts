import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DashboardComponentStateProps } from "widgets/BhandaraCheckin/types";

const getInitialState = (): DashboardComponentStateProps => ({
  totalCheckins: 0,
});

const slice = createSlice({
  name: "dashboard",
  initialState: getInitialState(),
  reducers: {
    setTotalCheckins: (state, action: PayloadAction<number>) => {
      state.totalCheckins = action.payload;
    },
  },
});

export const {
  actions: dashboardActions,
  reducer: dashboardReducer,
  name: dashboardName,
} = slice;
