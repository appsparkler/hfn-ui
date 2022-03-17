import Alert, { AlertColor } from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import Box from "@mui/material/Box";
import React, { useCallback, useState } from "react";
import Button from "@mui/material/Button";
import noop from "lodash/fp/noop";
import { ClickHandler } from "../../types";

export type AsyncButtonProps = {
  onClick: ClickHandler;
  disabled?: boolean;
  errorMessage: string;
  successMessage: string;
  label: string;
};

export const AsyncButton = ({
  onClick = noop,
  disabled,
  label = "Sign In",
  successMessage = "Done!",
  errorMessage = "Oops! Something went wrong!",
}: AsyncButtonProps) => {
  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    message: string;
    severity: AlertColor;
  }>({
    isOpen: false,
    message: "",
    severity: "error",
  });
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const handleClick = useCallback<ClickHandler>(
    async (evt) => {
      setIsProcessing(true);
      try {
        await onClick(evt);
        setSnackbar({
          isOpen: true,
          message: successMessage,
          severity: "success",
        });
      } catch (e) {
        setSnackbar({
          isOpen: true,
          message: errorMessage,
          severity: "error",
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [errorMessage, onClick, successMessage]
  );
  const handleSnackbarClose = useCallback<SnackbarProps["onClose"]>(() => {
    setSnackbar((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  return (
    <Box sx={{ position: "relative", display: "inline-block" }}>
      <Button
        variant="contained"
        type="button"
        onClick={handleClick}
        disabled={disabled || Boolean(isProcessing)}
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
