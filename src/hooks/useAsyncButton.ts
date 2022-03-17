import { AlertColor } from "@mui/material/Alert";
import { SnackbarProps } from "@mui/material/Snackbar";
import { useCallback, useState } from "react";
import { ClickHandler } from "../types";

export const useAsyncButton = (onClick) => {
  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    message?: string;
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
        const successMessage = await onClick(evt);
        setSnackbar({
          isOpen: true,
          message: String(successMessage),
          severity: "success",
        });
      } catch (e) {
        setSnackbar({
          isOpen: true,
          message: e.message,
          severity: "error",
        });
      } finally {
        setIsProcessing(false);
      }
    },
    [onClick]
  );
  const handleSnackbarClose = useCallback<SnackbarProps["onClose"]>(() => {
    setSnackbar((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  return {
    snackbar,
    handleSnackbarClose,
    handleClick,
    isProcessing,
  };
};
