import { AlertColor } from "@mui/material/Alert";
import { SnackbarProps } from "@mui/material/Snackbar";
import { useCallback, useEffect, useState } from "react";
import { ClickHandler } from "../types";

export const useAsyncButton = (onClick, disabled) => {
  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    message?: string;
    severity: AlertColor;
  }>({
    isOpen: false,
    message: "",
    severity: "error",
  });
  const [isMounted, setIsMounted] = useState(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const handleClick = useCallback<ClickHandler>(
    async (evt) => {
      if (!isMounted) return;
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
    [isMounted, onClick]
  );
  const handleSnackbarClose = useCallback<SnackbarProps["onClose"]>(() => {
    setSnackbar((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  useEffect(() => {
    setIsMounted(true);

    return () => {
      setIsMounted(false);
    };
  }, []);

  return {
    snackbar,
    handleSnackbarClose,
    handleClick,
    isProcessing,
    isDisabled: disabled || Boolean(isProcessing),
  };
};
