import { createSlice } from "@reduxjs/toolkit";
import { BarcodeScannerStateProps } from "./BarcodeScanner";

export const barcodeScannerSlice = createSlice({
  name: "barcodeScanner",
  initialState: {
    show: false,
  } as BarcodeScannerStateProps,
  reducers: {
    show: (state) => {
      state.show = true;
    },
    hide: (state) => {
      state.show = false;
    },
  },
});
