import { createSlice } from "@reduxjs/toolkit";
import { SnackbarProps } from "./Snackbar";

const getInitialState = (): SnackbarProps => {
  return {
    open: false,
  };
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: getInitialState(),
  reducers: {
    setState: (
      state,
      { payload: { open, severity, children } }: { payload: SnackbarProps }
    ) => {
      return { ...state, open, severity, children };
    },
    openSnackbar: (state) => {
      state.open = true;
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});
