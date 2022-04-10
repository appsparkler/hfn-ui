import {
  Alert,
  AlertProps,
  Snackbar as MUISnackbar,
  SnackbarOrigin,
  SnackbarProps as MUISnackbarProps,
} from "@mui/material";

export type SnackbarProps = {
  // SNACKBAR PROPS
  open?: MUISnackbarProps["open"];
  autoHideDuration?: MUISnackbarProps["autoHideDuration"];
  snackbarProps?: MUISnackbarProps;
  onClose?: MUISnackbarProps["onClose"];
  vertical?: SnackbarOrigin["vertical"];
  horizontal?: SnackbarOrigin["horizontal"];
  // ALERT PROPS
  severity?: AlertProps["severity"];
  variant?: AlertProps["variant"];
  alertProps?: AlertProps;
  children?: AlertProps["children"];
};

export const Snackbar = ({
  open,
  autoHideDuration,
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
    <Alert severity={severity} variant={variant} {...alertProps}>
      {children}
    </Alert>
  </MUISnackbar>
);
