import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import React from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import noop from "lodash/fp/noop";
import { useAsyncButton } from "../../hooks/useAsyncButton";
import { ClickHandler } from "../../types";

export type AsyncButtonProps = ButtonProps & {
  onClick: ClickHandler;
  disabled?: boolean;
  errorMessage: string;
  successMessage: string;
  label: string;
  size?: ButtonProps["size"];
  variant?: ButtonProps["variant"];
};

export const AsyncButton = ({
  onClick = noop,
  disabled,
  label = "Sign In",
  successMessage = "Done!",
  errorMessage = "Oops! Something went wrong!",
  size,
  variant,
  ...restProps
}: AsyncButtonProps) => {
  const {
    snackbar,
    handleSnackbarClose,
    handleClick,
    isProcessing,
    isDisabled,
  } = useAsyncButton(onClick, disabled);
  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Button
        type="button"
        onClick={handleClick}
        disabled={isDisabled}
        size={size}
        variant={variant}
        {...restProps}
      >
        {label}
      </Button>
      {isProcessing && (
        <CircularProgress
          sx={{
            position: "absolute",
            left: "calc(50% - 10px)",
            top: "calc(50% - 10px)",
          }}
          size={20}
        />
      )}
      <Snackbar
        open={snackbar.isOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};
