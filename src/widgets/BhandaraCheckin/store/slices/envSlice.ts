import { createSlice } from "@reduxjs/toolkit";
import { getEnv } from "widgets/BhandaraCheckin/utils";

const getInitialState = () => getEnv();

export const envSlice = createSlice({
  name: "env",
  initialState: getInitialState(),
  reducers: {},
});

export const { actions: envActions, reducer: envReducer } = envSlice;
