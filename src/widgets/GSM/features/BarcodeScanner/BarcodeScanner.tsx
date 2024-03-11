import { Button /**SelectProps */, Card, CardContent } from "@mui/material";
import { BrowserMultiFormatReader } from "@zxing/library";
import { Vertical } from "components";
import { useEffect, useMemo, useRef } from "react";

export type BarcodeScannerDispatchProps = {
  onScan: (result: string) => void;
  onCancel: () => void;
};

export type BarcodeScannerStateProps = {};

export type BarcodeScannerProps = BarcodeScannerStateProps &
  BarcodeScannerDispatchProps;

export const BarcodeScanner = ({ onScan, onCancel }: BarcodeScannerProps) => {
  const codeReader = useMemo<BrowserMultiFormatReader>(
    () => new BrowserMultiFormatReader(),
    []
  );

  const videoRef = useRef<HTMLVideoElement | null>(null);

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
    <Vertical mx="auto" p={1} justifyContent={"center"} alignItems={"center"}>
      <Card sx={{ opacity: 0.87, maxWidth: 420, bgcolor: "background.paper" }}>
        <CardContent>
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
        </CardContent>
      </Card>
    </Vertical>
  );

  // return (
  //   <Box
  //     display="flex"
  //     p={1}
  //     position="fixed"
  //     left={leftRightPosition}
  //     right={leftRightPosition}
  //     top={topBottomPosition}
  //     bottom={topBottomPosition}
  //     flexDirection={"column"}
  //     justifyContent="space-between"
  //     alignItems={"center"}
  //     bgcolor="background.default"
  //   >
  //     <video ref={videoRef} width="100%" />
  //     <Button
  //       variant="contained"
  //       type="button"
  //       onClick={onCancel}
  //       sx={{ my: 2 }}
  //       color="warning"
  //     >
  //       CANCEL
  //     </Button>
  //   </Box>
  // );
};
