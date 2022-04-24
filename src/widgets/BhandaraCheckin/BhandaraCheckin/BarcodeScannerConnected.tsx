import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  BarcodeScanner,
  BarcodeScannerDispatchProps,
  BarcodeScannerStateProps,
} from "components/BarcodeScanner/BarcodeScanner";
import { RootState, handleMountScanner } from "widgets/BhandaraCheckin/store";
import { handlePlayScannerVideo } from "../store/actions/handlePlayScannerVideo";

const mapStateToProps: MapStateToProps<
  BarcodeScannerStateProps,
  {},
  RootState
> = ({ barcodeScanner }) => barcodeScanner;

const mapDispatchToProps: MapDispatchToProps<BarcodeScannerDispatchProps, {}> =
  (dispatch) => {
    return {
      onCancel: console.log,
      onMount: () => dispatch<any>(handleMountScanner()),
      onPlayVideo: () => dispatch<any>(handlePlayScannerVideo()),
      onScan: console.log,
    };
  };

export const BarcodeScannerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(BarcodeScanner);
