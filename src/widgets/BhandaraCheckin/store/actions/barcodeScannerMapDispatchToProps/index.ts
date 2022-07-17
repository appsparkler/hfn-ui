import { isRejectedWithValue } from "@reduxjs/toolkit";
import { BrowserMultiFormatReader } from "@zxing/library";
import { BarcodeScannerDispatchProps } from "components";
import { noop } from "lodash";
import { MapDispatchToProps } from "react-redux";
import { onCancel } from "./onCancel";
import { onMount } from "./onMount";
import { onUnmount } from "./onUnmount";

export const barcodeScannerMapDispatchtToProps: MapDispatchToProps<
  BarcodeScannerDispatchProps,
  {}
> = (dispatch) => {
  return {
    onCancel: () => onCancel(dispatch),
    onMount: async (videoRef) => {
      // videoRef.current ? await dispatch<any>(onMount(videoRef.current)) : noop;
      if (videoRef.current) {
        const res = await dispatch<any>(onMount(videoRef.current));
        if (!isRejectedWithValue(onMount)) {
          return res.payload as BrowserMultiFormatReader;
        } else {
          return null;
        }
      }
      return null;
    },
    onUnmount: () => {},
  };
};
