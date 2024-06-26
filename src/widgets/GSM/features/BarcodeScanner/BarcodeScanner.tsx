import { Button, Card, CardContent } from "@mui/material";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Vertical } from "components";
import { useEffect, useMemo, useRef, useState } from "react";
// import { useAppDispatch } from "../redux-app/hooks";
// import { homeScreenActions } from "../HomeScreen/homeScreenSlice";
// import { successScreenActions } from "../SuccessScreen/successScreenSlice";

export type BarcodeScannerDispatchProps = {
  onScan: (result: string) => void;
  onCancel: () => void;
};

export type BarcodeScannerStateProps = {};

export type BarcodeScannerProps = BarcodeScannerStateProps &
  BarcodeScannerDispatchProps;

export const BarcodeScanner = ({ onScan, onCancel }: BarcodeScannerProps) => {
  // const dispatch = useAppDispatch();

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
      codeReader.decodeFromVideoDevice("", videoElement, (result, error) => {
        if (!error) {
          onScan(result.getText());
        }
      });
    }
    return () => {
      if (videoElement !== null) {
        codeReader.reset();
        videoElement.src = "";
        videoRef.current = null;
      }
    };
  }, [codeReader, onScan]);

  // useEffect(() => {
  //   // reset all user info to start afresh

  // }, [dispatch]);

  return (
    <Vertical mx="auto" p={2} justifyContent={"center"} alignItems={"center"}>
      <Card
        variant="outlined"
        sx={{
          opacity: 0.87,
          maxWidth: 420,
          bgcolor: "background.paper",
        }}
      >
        <CardContent>
          <video ref={videoRef} width="100%" />
          <Button
            variant="contained"
            type="button"
            disabled={!isVideoPlaying}
            onClick={onCancel}
            sx={{ my: 2 }}
            color="warning"
          >
            {isVideoPlaying ? "CANCEL" : "Loading..."}
          </Button>
        </CardContent>
      </Card>
    </Vertical>
  );
};
