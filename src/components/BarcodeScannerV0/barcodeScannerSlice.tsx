import { createSlice } from "@reduxjs/toolkit";
import { BarcodeScannerV0StateProps } from "./BarcodeScanner";

export const barcodeScannerSlice = createSlice({
  name: "barcodeScanner",
  initialState: {
    show: false,
  } as BarcodeScannerV0StateProps,
  reducers: {
    show: (state) => {
      state.show = true;
    },
    hide: (state) => {
      state.show = false;
    },
  },
});
