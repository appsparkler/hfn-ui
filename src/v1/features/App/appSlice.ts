import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "v1/app/store";

const getInitialState = () => {
  return {};
};

const appSlice = createSlice({
  name: "appSlice",
  initialState: getInitialState(),
  reducers: {},
});

export const { actions: appActions, reducer: appReducer } = appSlice;

export const selectAppReducer = (state: RootState) => state.app;
