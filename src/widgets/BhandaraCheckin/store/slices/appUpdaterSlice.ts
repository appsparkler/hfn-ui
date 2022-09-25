import { createSlice } from "@reduxjs/toolkit";
import { AppUpdaterProps } from "widgets/BhandaraCheckin/types";

const initialState: AppUpdaterProps = {
  progressText: "Checking for updates...",
};

const appUpdaterSlice = createSlice({
  name: "appUpdater",
  initialState,
  reducers: {
    checkForUpdates: (state) => {
      state.progressText = "Checking for updates...";
    },
    updatingApp: (state) => {
      state.progressText = "Updating app...";
    },
    appIsUpdated: (state) => {
      state.progressText = "App is updated";
    },
  },
});

export const {
  actions: appUpdaterActions,
  reducer: appUpdaterReducer,
  getInitialState: appUpdaterInitialState,
  name: appUpdaterName,
} = appUpdaterSlice;
