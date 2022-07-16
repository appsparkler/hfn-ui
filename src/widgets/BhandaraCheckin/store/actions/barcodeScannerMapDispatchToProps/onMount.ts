import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  codeReader,
  removeScannerOnKey,
  setScannerOnKey,
} from "widgets/BhandaraCheckin/constants";
import { ThunkApiConfig } from "widgets/BhandaraCheckin/types";
import { mainSectionActions } from "../..";

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
          alert(result.getText());
        }
      });
    } catch (e) {
      dispatch(mainSectionActions.turnOffScanner());
      dispatch(mainSectionActions.stopProcessingScanButton());
      removeScannerOnKey();
    }
  }
);
