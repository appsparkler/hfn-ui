import { createSlice } from "@reduxjs/toolkit";
import { BarcodeScannerV0StateProps } from "components";

const barcodeScannerV0Slice = createSlice({
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

export const {
  actions: barcodeScannerV0Actions,
  reducer: barcodeScannerV0Reducer,
  getInitialState: getBarcodeScannerV0InitialState,
  name: barcodeScannerV0Name,
} = barcodeScannerV0Slice;
