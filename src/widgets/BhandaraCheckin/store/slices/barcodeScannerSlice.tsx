import { createSlice } from "@reduxjs/toolkit";
import { BarcodeScannerStateProps } from "components";
import { BrowserBarcodeReader } from "@zxing/library";

const barcodeScannerSlice = createSlice({
  name: "barcodeScanner",
  initialState: {
    show: false,
    codeReader: undefined,
  } as BarcodeScannerStateProps & { codeReader?: BrowserBarcodeReader },
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
    usetCodeReader: (state) => {
      state.codeReader?.reset();
      state.codeReader = undefined;
    },
  },
});

export const {
  actions: barcodeScannerActions,
  reducer: barcodeScannerReducer,
  getInitialState: getBarcodeScannerInitialState,
  name: barcodeScannerName,
} = barcodeScannerSlice;
