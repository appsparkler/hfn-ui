import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageKeys } from "widgets/BhandaraCheckin/constants";
import { BhandaraCheckinStateProps } from "widgets/BhandaraCheckin/types";

const getInitialState = (): BhandaraCheckinStateProps => {
  const renderScanner = Boolean(
    localStorage.getItem(LocalStorageKeys.TURN_ON_SCANNER)
  );
  return {
    renderScanner,
    renderApp: false,
  };
};

const bhandaraCheckinSlice = createSlice({
  name: "bhandara-checkin",
  initialState: getInitialState(),
  reducers: {
    reset: (state) => {
      state.renderScanner = getInitialState().renderScanner;
    },
    renderScanner: (state) => {
      state.renderScanner = true;
    },
    unmountScanner: (state) => {
      state.renderScanner = false;
    },
    renderApp: (state) => {
      state.renderApp = true;
    },
  },
});

export const {
  actions: bhandaraCheckinActions,
  getInitialState: getBhandaraCheckinInitialState,
  name: bhandaraCheckinName,
  reducer: bhandaraCheckinReducer,
} = bhandaraCheckinSlice;
