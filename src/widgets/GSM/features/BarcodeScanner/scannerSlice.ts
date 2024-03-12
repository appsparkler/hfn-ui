import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "scanner",
  initialState: {},
  reducers: {},
});

export const { actions: scannerActions, reducer: scannerReducer } = slice;
