import { createSlice } from "@reduxjs/toolkit";

export enum Modes {
  LIGHT,
  DARK,
}

const modeSlice = createSlice({
  name: "mode",
  initialState: false,
  reducers: {
    setDarkTheme: () => true,
    setLightTheme: () => false,
  },
});

export const {
  actions: modeActions,
  reducer: modeReducer,
  name: modeName,
} = modeSlice;
