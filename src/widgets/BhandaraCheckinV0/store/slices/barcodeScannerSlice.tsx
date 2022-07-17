import { createSlice } from "@reduxjs/toolkit";
import { BarcodeScannerV0StateProps } from "components";
import { BrowserBarcodeReader } from "@zxing/library";

export const barcodeScannerSlice = createSlice({
  name: "barcodeScanner",
  initialState: {
    show: false,
    codeReader: undefined,
  } as BarcodeScannerV0StateProps & { codeReader?: BrowserBarcodeReader },
  reducers: {
    show: (state) => {
      state.show = true;
    },
    hide: (state) => {
      state.show = false;
    },
    setCodeReader: (state, { payload }: { payload: BrowserBarcodeReader }) => {
      state.codeReader = payload;
    },
  },
});

export const {
  actions: barcodeScannerActions,
  reducer: barcodeScannerReducer,
  getInitialState: getBarcodeScannerInitialState,
  name: barcodeScannerName,
} = barcodeScannerSlice;
