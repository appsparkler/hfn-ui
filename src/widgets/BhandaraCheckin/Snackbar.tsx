import { Alert, AlertProps, Snackbar, SnackbarProps } from "@mui/material";

export type AppSnackbarProps = {
  open?: SnackbarProps["open"];
  autoHideDuration?: SnackbarProps["autoHideDuration"];
  severity?: AlertProps["severity"];
  snackbarProps?: SnackbarProps;
  alertProps?: AlertProps;
  children?: AlertProps["children"];
  onClose?: SnackbarProps["onClose"];
};

export const AppSnackbar = ({
  open,
  autoHideDuration,
  severity,
  snackbarProps,
  alertProps,
  onClose,
}: AppSnackbarProps) => (
  <Snackbar
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
    {...snackbarProps}
  >
    <Alert severity={severity} {...alertProps}></Alert>
  </Snackbar>
);
