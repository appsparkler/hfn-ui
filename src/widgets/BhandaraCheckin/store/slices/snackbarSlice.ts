import { createSlice } from "@reduxjs/toolkit";
import { SnackbarStateProps } from "../../../../components/Snackbar/Snackbar";

type PickedSnackbarProps = Pick<
  SnackbarStateProps,
  | "children"
  | "vertical"
  | "horizontal"
  | "variant"
  | "severity"
  | "autoHideDuration"
>;

const getInitialState = (): SnackbarStateProps => {
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

const snackbarSlice = createSlice({
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

export const {
  actions: snackbarActions,
  reducer: snackbarReducer,
  name: snackbarName,
} = snackbarSlice;
