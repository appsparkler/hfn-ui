import * as React from "react";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { FabProps } from "@mui/material/Fab";
import CheckIcon from "@mui/icons-material/Check";
import { useMemo } from "react";
import Snackbar from "@mui/material/Snackbar";
import { useAsyncButton } from "../../hooks/useAsyncButton";
import Alert from "@mui/material/Alert";
import { IconButton } from "@mui/material";

export type CircularInegrationProps = {
  disabled?: boolean;
  onClick: (evt: React.MouseEvent<HTMLInputElement>) => Promise<string> | void;
  size: FabProps["size"];
};

export function CircularIntegration({
  disabled,
  size,
  onClick,
}: CircularInegrationProps) {
  const {
    isProcessing,
    snackbar,
    handleClick,
    handleSnackbarClose,
    isDisabled,
  } = useAsyncButton(onClick, disabled);

  const circularProgressSize = useMemo<number>(() => {
    switch (size) {
      case "small":
        return 34;
      case "large":
        return 48;
      default:
        return 40;
    }
  }, [size]);

  return (
    <Box sx={{ m: 1, position: "relative" }}>
      <IconButton
        aria-label="save"
        color="default"
        onClick={handleClick}
        size={size}
        disabled={isDisabled}
      >
        <CheckIcon />
      </IconButton>
      {isProcessing && (
        <CircularProgress
          size={circularProgressSize}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
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
}
