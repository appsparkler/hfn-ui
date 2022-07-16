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
    onMount: (videoRef) =>
      videoRef.current ? dispatch<any>(onMount(videoRef.current)) : noop,
    onUnmount: () => onUnmount(dispatch),
  };
};
