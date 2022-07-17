import { createAsyncThunk } from "@reduxjs/toolkit";
import { BrowserMultiFormatReader } from "@zxing/library";
import {
  ErrorCodes,
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

export const onMount = createAsyncThunk<any, HTMLVideoElement, ThunkApiConfig>(
  "onMountBarcodeScanner",
  async (videoEl, { dispatch, rejectWithValue, fulfillWithValue }) => {
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
      const codeReader = new BrowserMultiFormatReader();
      codeReader.decodeFromVideoDevice("", videoEl, (result, error) => {
        if (!error) {
          dispatch(handleScan(result.toString()));
        }
      });
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
      return rejectWithValue(ErrorCodes.CAMERA_PERMISSION_DENIED);
    }
  }
);
