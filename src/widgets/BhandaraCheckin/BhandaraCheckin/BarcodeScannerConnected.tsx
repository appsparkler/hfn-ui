import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  BarcodeScanner,
  BarcodeScannerDispatchProps,
  BarcodeScannerStateProps,
} from "components/BarcodeScanner/BarcodeScanner";
import { RootState } from "../store";

const mapStateToProps: MapStateToProps<
  BarcodeScannerStateProps,
  {},
  RootState
> = ({ barcodeScanner }) => barcodeScanner;

const mapDispatchToProps: MapDispatchToProps<BarcodeScannerDispatchProps, {}> =
  (dispatch) => {
    return {
      onCancel: console.log,
      onMount: console.log,
      onPlayVideo: console.log,
      onScan: console.log,
    };
  };

export const BarcodeScannerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(BarcodeScanner);
