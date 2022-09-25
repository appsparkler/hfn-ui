import { createSlice } from "@reduxjs/toolkit";
import { LocalStorageKeys } from "widgets/BhandaraCheckin/constants";
import { BhandaraCheckinViewStateProps } from "widgets/BhandaraCheckin/types";

const getInitialState = (): BhandaraCheckinViewStateProps => {
  const renderScanner = Boolean(
    localStorage.getItem(LocalStorageKeys.TURN_ON_SCANNER)
  );
  return {
    renderScanner,
  };
};

const bhandaraCheckinSlice = createSlice({
  name: "bhandara-checkin",
  initialState: getInitialState(),
  reducers: {
    reset: () => getInitialState(),
    renderScanner: (state) => {
      state.renderScanner = true;
    },
    unmountScanner: (state) => {
      state.renderScanner = false;
    },
  },
});

export const {
  actions: bhandaraCheckinActions,
  getInitialState: getBhandaraCheckinInitialState,
  name: bhandaraCheckinName,
  reducer: bhandaraCheckinReducer,
} = bhandaraCheckinSlice;
