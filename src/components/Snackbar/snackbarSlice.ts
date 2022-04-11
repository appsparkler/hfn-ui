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
    severity: "warning",
    vertical: "top",
    horizontal: "right",
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
        open: true,
        ...payload,
      };
    },
    closeSnackbar: (state) => {
      state.open = false;
    },
  },
});
