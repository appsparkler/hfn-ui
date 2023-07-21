// import { Box, Button /**SelectProps */ } from "@mui/material";
// import {
//   /**VideoInputDevice, */ BrowserBarcodeReader,
// } from "@zxing/library/esm";
// import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// export type BarcodeScannerV0DispatchProps = {
//   onMount: () => void;
//   onScan: (value: string) => void;
//   onCancel: () => void;
//   onPlayVideo: () => void;
// };

// export type BarcodeScannerV0StateProps = {
//   show?: boolean;
// };

// export type BarcodeScannerV0Props = BarcodeScannerV0StateProps &
//   BarcodeScannerV0DispatchProps;

// export const BarcodeScannerV0 = ({
//   show,
//   onMount,
//   onPlayVideo,
//   onCancel,
//   onScan,
// }: BarcodeScannerV0Props) => {
//   // const [devices, setDevices] = useState<VideoInputDevice[]>([]);
//   const videoRef = useRef(null);
//   const codeReader = useMemo(() => new BrowserBarcodeReader(), []);
//   const [selectedDeviceId, setSelectedDeviceId] = useState<string>();

//   const topBottomPosition = useMemo<number>(() => (show ? 0 : 10000), [show]);

//   const leftRightPosition = useMemo<string | number>(
//     () => (show ? "calc(50% - 200px)" : 10000),
//     [show]
//   );

//   const startCodeReader = useCallback(() => {
//     if (videoRef.current && selectedDeviceId) {
//       const intervalId = setInterval(() => {
//         if (videoRef.current) {
//           const isVideoPlaying = codeReader.isVideoPlaying(videoRef.current);
//           if (isVideoPlaying) {
//             onPlayVideo();
//             clearInterval(intervalId);
//           }
//         }
//       }, 300);
//       return (
//         codeReader
//           // .decodeOnceFromVideoDevice(undefined, videoRef.current)
//           .decodeFromVideoDevice(
//             // selectedDeviceId,
//             "",
//             videoRef.current,
//             (result, error) => {
//               if (!error) {
//                 onScan(result.getText());
//               }
//             }
//           )
//       );
//       // .then((result) => result.getText())
//       // .then((result) => {
//       //   onScan(result);
//       // })
//       // .then(() => setOpen(false))
//       // .catch(console.log);
//     }
//   }, [codeReader, onPlayVideo, onScan, selectedDeviceId]);

//   // const handleChangeDevice = useCallback<NonNullable<SelectProps["onChange"]>>(
//   //   ({ target: { value } }) => {
//   //     setSelectedDeviceId(value as string);
//   //   },
//   //   []
//   // );

//   useEffect(() => {
//     onMount();
//     codeReader.listVideoInputDevices().then((devices) => {
//       // TODO - NEED TO HANDLE THIS FOR MULTIPLE CAMS ON DEVICE
//       if (devices.length > 0 && videoRef.current) {
//         // setDevices(devices);
//       }
//       const selectedDeviceId = devices[0].deviceId;
//       setSelectedDeviceId(selectedDeviceId);
//     });
//     return () => {
//       codeReader.reset();
//     };
//   }, [codeReader, onMount]);

//   useEffect(() => {
//     startCodeReader();
//     return () => {
//       codeReader.reset();
//     };
//   }, [codeReader, startCodeReader]);

//   return (
//     <Box
//       display="flex"
//       position="fixed"
//       left={leftRightPosition}
//       right={leftRightPosition}
//       top={topBottomPosition}
//       bottom={topBottomPosition}
//       flexDirection={"column"}
//       justifyContent="space-between"
//       alignItems={"center"}
//       bgcolor="background.default"
//     >
//       <video ref={videoRef} width="100%" />
//       <Button
//         variant="contained"
//         type="button"
//         onClick={onCancel}
//         sx={{ my: 2 }}
//         color="warning"
//       >
//         CANCEL
//       </Button>
//     </Box>
//   );
// };

export const abc = "abc";
