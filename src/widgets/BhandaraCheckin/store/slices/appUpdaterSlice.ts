import { createSlice } from "@reduxjs/toolkit";
import { AppUpdaterProps } from "widgets/BhandaraCheckin/types";

const initialState: AppUpdaterProps = {
  progressText: "Checking for updates...",
  inProgress: true,
  success: false,
  warning: false,
};

const appUpdaterSlice = createSlice({
  name: "appUpdater",
  initialState,
  reducers: {
    checkForUpdates: (state) => {
      state.progressText = "Checking for updates...";
      state.inProgress = true;
      state.warning = false;
      state.success = false;
    },
    updatingApp: (state) => {
      state.progressText = "App is out of date.  Updating...";
      state.inProgress = false;
      state.warning = true;
      state.success = false;
    },
    appIsUpdated: (state) => {
      state.progressText = "App is up to date";
      state.inProgress = false;
      state.warning = false;
      state.success = true;
    },
  },
});

export const {
  actions: appUpdaterActions,
  reducer: appUpdaterReducer,
  getInitialState: appUpdaterInitialState,
  name: appUpdaterName,
} = appUpdaterSlice;
