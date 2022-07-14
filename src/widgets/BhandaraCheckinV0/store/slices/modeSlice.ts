import { createSlice } from "@reduxjs/toolkit";

export enum Modes {
  DARK,
  LIGHT,
}

const getInitialState = () => {
  const mode = localStorage.getItem("mode");
  if (mode === "dark") {
    return Modes.DARK;
  }
  return Modes.LIGHT;
};

const modeSlice = createSlice({
  name: "mode",
  initialState: getInitialState(),
  reducers: {
    setDarkTheme: () => Modes.DARK,
    setLightTheme: () => Modes.LIGHT,
  },
  extraReducers: (build) => {
    build
      .addMatcher(
        (action) => action.type === "mode/setDarkTheme",
        (state) => {
          localStorage.setItem("mode", "dark");
          return state;
        }
      )
      .addMatcher(
        (action) => action.type === "mode/setLightTheme",
        (state) => {
          localStorage.removeItem("mode");
          return state;
        }
      );
  },
});

export const {
  actions: modeActions,
  reducer: modeReducer,
  name: modeName,
} = modeSlice;
