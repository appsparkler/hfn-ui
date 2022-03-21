import { useCallback, useEffect, useState } from "react";
import { ClickHandler } from "../types";

import { AlertColor, SnackbarProps } from "@mui/material";

export const useAsyncButton = (onClick: ClickHandler, disabled: boolean) => {
  const [snackbar, setSnackbar] = useState<{
    isOpen: boolean;
    message?: string;
    severity: AlertColor;
  }>({
    isOpen: false,
    message: "",
    severity: "error",
  });
  const [isMounted, setIsMounted] = useState<boolean>(false);
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
      } catch (e: any) {
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
  const handleSnackbarClose = useCallback<
    NonNullable<SnackbarProps["onClose"]>
  >(() => {
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
