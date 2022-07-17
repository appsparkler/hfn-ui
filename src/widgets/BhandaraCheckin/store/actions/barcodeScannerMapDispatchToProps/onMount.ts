import { createAsyncThunk } from "@reduxjs/toolkit";
import { BrowserMultiFormatReader } from "@zxing/library";
import {
  removeScannerOnKey,
  setScannerOnKey,
} from "widgets/BhandaraCheckin/constants";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import {
  bhandaraCheckinActions,
  mainSectionActions,
  snackbarActions,
} from "../..";
import { handleScan } from "../handleScan";

export const onMount = createAsyncThunk<
  any,
  { videoEl: HTMLVideoElement; codeReader: BrowserMultiFormatReader },
  ThunkApiConfig
>(
  "onMountBarcodeScanner",
  async (
    { videoEl, codeReader },
    { dispatch, rejectWithValue, fulfillWithValue }
  ) => {
    try {
      dispatch(mainSectionActions.turnOnScanner());
      dispatch(mainSectionActions.startProcessingScanButton());
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      const intervalId = setInterval(() => {
        if (videoEl) {
          const isVideoPlaying = codeReader.isVideoPlaying(videoEl);
          if (isVideoPlaying) {
            clearInterval(intervalId);
            dispatch(mainSectionActions.stopProcessingScanButton());
          }
        }
      }, 300);
      codeReader.decodeFromVideoDevice(null, videoEl, (result, error) => {
        if (!error) {
          dispatch(handleScan(result.toString()));
        }
      });
      setScannerOnKey();
      return fulfillWithValue(codeReader);
    } catch (e) {
      dispatch(mainSectionActions.turnOffScanner());
      dispatch(mainSectionActions.stopProcessingScanButton());
      dispatch(
        snackbarActions.openSnackbar({
          children: `Scanner cannot be turned on without camera permission.  Please reset the permissions and try again.`,
        })
      );
      removeScannerOnKey();
      dispatch(bhandaraCheckinActions.unmountScanner());
    }
  }
);
