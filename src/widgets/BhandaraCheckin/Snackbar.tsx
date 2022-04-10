import { Alert, AlertProps, Snackbar, SnackbarProps } from "@mui/material";

export type AppSnackbarProps = {
  open?: SnackbarProps["open"];
  autoHideDuration?: SnackbarProps["autoHideDuration"];
  severity?: AlertProps["severity"];
  variant?: AlertProps["variant"];
  snackbarProps?: SnackbarProps;
  alertProps?: AlertProps;
  children?: AlertProps["children"];
  onClose?: SnackbarProps["onClose"];
};

export const AppSnackbar = ({
  open,
  autoHideDuration,
  severity,
  variant,
  snackbarProps,
  alertProps,
  children,
  onClose,
}: AppSnackbarProps) => (
  <Snackbar
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
    {...snackbarProps}
  >
    <Alert severity={severity} variant={variant} {...alertProps}>
      {children}
    </Alert>
  </Snackbar>
);
