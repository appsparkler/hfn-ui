import { Card, CardContent, CardMedia, Typography } from "@mui/material";
import { BrowserMultiFormatReader } from "@zxing/library";
import { useEffect, useMemo, useRef, useState } from "react";
import { ScreenWrapper } from "../components/ScreenWrapper/ScreenWrapper";
import { OutlinedButton } from "../components/buttons/OutlinedButton/OutlinedButton";

export type BarcodeScannerDispatchProps = {
  onScan: (result: string) => void;
  onDenyPermission: () => void;
  onCancel: () => void;
};

export type BarcodeScannerStateProps = {};

export type BarcodeScannerProps = BarcodeScannerStateProps &
  BarcodeScannerDispatchProps;

export const BarcodeScanner = ({
  onScan,
  onCancel,
  onDenyPermission,
}: BarcodeScannerProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const codeReader = useMemo<BrowserMultiFormatReader>(
    () => new BrowserMultiFormatReader(),
    []
  );

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (videoElement !== null) {
      const intervalId = setInterval(() => {
        const isPlaying = codeReader.isVideoPlaying(videoElement);
        setIsVideoPlaying(isPlaying);
        if (isPlaying) {
          clearInterval(intervalId);
        }
      }, 300);
      codeReader
        .decodeFromVideoDevice("", videoElement, (result, error) => {
          if (!error) {
            onScan(result.getText());
          }
        })
        .catch(() => {
          onDenyPermission();
        });
    }
    return () => {
      if (videoElement !== null) {
        codeReader.reset();
        videoElement.src = "";
        videoRef.current = null;
      }
    };
  }, [codeReader, onDenyPermission, onScan]);

  return (
    <ScreenWrapper
      mx="auto"
      p={2}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Card sx={{ width: "100%" }}>
        <CardMedia>
          <Typography
            p={2}
            bgcolor={"primary.main"}
            color="primary.contrastText"
            variant="h5"
          >
            Scan QR or Barcode
          </Typography>
        </CardMedia>
        <CardMedia>
          <video ref={videoRef} width="100%" />
        </CardMedia>
        <CardContent>
          <OutlinedButton
            disabled={!isVideoPlaying}
            onClick={onCancel}
            sx={{ my: 2 }}
          >
            {isVideoPlaying ? "CANCEL" : "Loading..."}
          </OutlinedButton>
        </CardContent>
      </Card>
    </ScreenWrapper>
  );
};
