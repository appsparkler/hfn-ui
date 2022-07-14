import { createSlice } from "@reduxjs/toolkit";
import { OfflineDataStateProps } from "widgets/BhandaraCheckin/types/components/OfflineData";

const getInitialState = (): OfflineDataStateProps => {
  return {
    data: [],
  };
};

const offlinDataSlice = createSlice({
  name: "offlineData",
  initialState: getInitialState(),
  reducers: {
    update: (state, { payload }) => {
      state.data = payload;
    },
  },
});

export const {
  actions: offlineDataActions,
  reducer: offlineDataReducer,
  name: offlineDataName,
} = offlinDataSlice;
