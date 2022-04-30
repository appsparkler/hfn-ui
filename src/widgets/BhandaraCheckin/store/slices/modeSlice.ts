import { createSlice } from "@reduxjs/toolkit";

export enum Modes {
  LIGHT,
  DARK,
}

const modeSlice = createSlice({
  name: "mode",
  initialState: Modes.DARK,
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
