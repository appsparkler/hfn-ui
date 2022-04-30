import { createSlice } from "@reduxjs/toolkit";

export enum Modes {
  DARK,
  LIGHT,
}

const modeSlice = createSlice({
  name: "mode",
  initialState: Modes.LIGHT,
  reducers: {
    setDarkTheme: () => Modes.DARK,
    setLightTheme: () => Modes.LIGHT,
  },
});

export const {
  actions: modeActions,
  reducer: modeReducer,
  name: modeName,
} = modeSlice;
