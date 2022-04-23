import {
  Alert,
  AlertProps,
  Snackbar as MUISnackbar,
  SnackbarOrigin,
  SnackbarProps as MUISnackbarProps,
} from "@mui/material";

export type SnackbarStateProps = {
  // SNACKBAR PROPS
  open?: MUISnackbarProps["open"];
  autoHideDuration?: MUISnackbarProps["autoHideDuration"];
  snackbarProps?: MUISnackbarProps;
  vertical?: SnackbarOrigin["vertical"];
  horizontal?: SnackbarOrigin["horizontal"];
  // ALERT PROPS
  severity?: AlertProps["severity"];
  variant?: AlertProps["variant"];
  alertProps?: AlertProps;
  children?: AlertProps["children"];
};

export type SnackbarDispatchProps = {
  onClose?: MUISnackbarProps["onClose"];
};

export type SnackbarProps = SnackbarStateProps & SnackbarDispatchProps;

export const Snackbar = ({
  open,
  autoHideDuration = 5000,
  severity,
  variant,
  snackbarProps,
  alertProps,
  vertical = "bottom",
  horizontal = "left",
  children,
  onClose,
}: SnackbarProps) => (
  <MUISnackbar
    open={open}
    autoHideDuration={autoHideDuration}
    onClose={onClose}
    {...snackbarProps}
    anchorOrigin={{ vertical, horizontal }}
  >
    <Alert
      severity={severity}
      variant={variant}
      onClose={onClose as AlertProps["onClose"]}
      {...alertProps}
    >
      {children}
    </Alert>
  </MUISnackbar>
);
