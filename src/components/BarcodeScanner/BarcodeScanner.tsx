import { Box, Button /**SelectProps */ } from "@mui/material";
import { useEffect, useMemo, useRef } from "react";

export type BarcodeScannerDispatchProps = {
  onMount: (videoRef: React.MutableRefObject<HTMLVideoElement | null>) => void;
  onCancel: () => void;
  onUnmount: () => void;
};

export type BarcodeScannerStateProps = {
  show?: boolean;
};

export type BarcodeScannerProps = BarcodeScannerStateProps &
  BarcodeScannerDispatchProps;

export const BarcodeScanner = ({
  show,
  onMount,
  onUnmount,
  onCancel,
}: BarcodeScannerProps) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const topBottomPosition = useMemo<number>(() => (show ? 0 : 10000), [show]);

  const leftRightPosition = useMemo<string | number>(
    () => (show ? "calc(50% - 200px)" : 10000),
    [show]
  );

  useEffect(() => {
    onMount(videoRef);
    return () => {
      onUnmount();
    };
  }, [onMount, onUnmount]);

  return (
    <Box
      display="flex"
      position="fixed"
      left={leftRightPosition}
      right={leftRightPosition}
      top={topBottomPosition}
      bottom={topBottomPosition}
      flexDirection={"column"}
      justifyContent="space-between"
      alignItems={"center"}
      bgcolor="background.default"
    >
      <video ref={videoRef} width="100%" />
      <Button
        variant="contained"
        type="button"
        onClick={onCancel}
        sx={{ my: 2 }}
        color="warning"
      >
        CANCEL
      </Button>
    </Box>
  );
};
