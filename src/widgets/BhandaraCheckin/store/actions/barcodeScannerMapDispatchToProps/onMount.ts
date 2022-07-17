import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  codeReader,
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

export const onMount = createAsyncThunk<void, HTMLVideoElement, ThunkApiConfig>(
  "onMountBarcodeScanner",
  async (videoEl, { dispatch }) => {
    try {
      dispatch(mainSectionActions.turnOnScanner());
      dispatch(mainSectionActions.startProcessingScanButton());
      await navigator.mediaDevices.getUserMedia({ video: true });
      setScannerOnKey();
      const intervalId = setInterval(() => {
        if (videoEl) {
          const isVideoPlaying = codeReader.isVideoPlaying(videoEl);
          if (isVideoPlaying) {
            clearInterval(intervalId);
            dispatch(mainSectionActions.stopProcessingScanButton());
          }
        }
      }, 300);
      codeReader.decodeFromVideoDevice("", videoEl, (result, error) => {
        if (!error) {
          dispatch(handleScan(result.toString()));
        }
      });
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
