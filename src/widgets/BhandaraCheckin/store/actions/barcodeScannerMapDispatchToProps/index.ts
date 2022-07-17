import { isRejectedWithValue } from "@reduxjs/toolkit";
import { BrowserMultiFormatReader } from "@zxing/library";
import { BarcodeScannerDispatchProps } from "components";
import { MapDispatchToProps } from "react-redux";
import { onCancel } from "./onCancel";
import { onMount } from "./onMount";

export const barcodeScannerMapDispatchtToProps: MapDispatchToProps<
  BarcodeScannerDispatchProps,
  {}
> = (dispatch) => {
  return {
    onCancel: () => onCancel(dispatch),
    onMount: async (videoRef, codeReader) => {
      if (videoRef.current) {
        const res = await dispatch<any>(
          onMount({ videoEl: videoRef.current, codeReader })
        );
        if (!isRejectedWithValue(onMount)) {
          return res.payload as BrowserMultiFormatReader;
        } else {
          return null;
        }
      }
      return null;
    },
  };
};
