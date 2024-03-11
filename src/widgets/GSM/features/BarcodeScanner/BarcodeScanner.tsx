import { Box, Button /**SelectProps */ } from "@mui/material";
import { BrowserMultiFormatReader } from "@zxing/library";
import { useEffect, useMemo, useRef } from "react";

export type BarcodeScannerDispatchProps = {
  onScan: (result: string) => void;
  onCancel: () => void;
};

export type BarcodeScannerStateProps = {
  show?: boolean;
};

export type BarcodeScannerProps = BarcodeScannerStateProps &
  BarcodeScannerDispatchProps;

export const BarcodeScanner = ({
  show,
  onScan,
  onCancel,
}: BarcodeScannerProps) => {
  const codeReader = useMemo<BrowserMultiFormatReader>(
    () => new BrowserMultiFormatReader(),
    []
  );

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const topBottomPosition = useMemo<number>(() => (show ? 0 : 10000), [show]);

  const leftRightPosition = useMemo<string | number>(
    () => (show ? "calc(50% - 220px)" : 10000),
    [show]
  );

  useEffect(() => {
    if (videoRef.current) {
      codeReader.decodeFromVideoDevice(
        "",
        videoRef.current,
        (result, error) => {
          if (!error) {
            onScan(result.getText());
          }
        }
      );
    }
    return () => {
      codeReader.reset();
    };
  }, [codeReader, onScan]);

  return (
    <Box
      display="flex"
      p={1}
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
