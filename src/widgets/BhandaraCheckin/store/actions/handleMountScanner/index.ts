import { createAsyncThunk } from "@reduxjs/toolkit";
import { mainSectionActions } from "../../slices";

export const handleMountScanner = createAsyncThunk(
  "handleMountScanner",
  async (_, { dispatch }) => {
    try {
      dispatch(mainSectionActions.startProcessingScanButton());
      dispatch(mainSectionActions.turnOnScanner());
      await navigator.mediaDevices.getUserMedia({ video: true });
    } catch (error) {
      dispatch(mainSectionActions.stopProcessingScanButton());
      dispatch(mainSectionActions.turnOffScanner());
    }
  }
);
