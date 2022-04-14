import { createSlice } from "@reduxjs/toolkit";
import { SnackbarProps } from "./Snackbar";

type PickedSnackbarProps = Pick<
  SnackbarProps,
  | "children"
  | "vertical"
  | "horizontal"
  | "variant"
  | "severity"
  | "autoHideDuration"
>;

const getInitialState = (): SnackbarProps => {
  return {
    open: false,
    autoHideDuration: 5000,
    horizontal: "right",
    vertical: "top",
    severity: "warning",
    variant: "filled",
    children: "",
  };
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState: getInitialState(),
  reducers: {
    setState: (state, { payload }: { payload: PickedSnackbarProps }) => {
      return { ...state, ...payload };
    },
    openSnackbar: (state, { payload }: { payload: PickedSnackbarProps }) => {
      return {
        ...state,
        autoHideDuration: 5000,
        horizontal: "right",
        vertical: "top",
        severity: "warning",
        variant: "filled",
        open: true,
        ...payload,
      };
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});
