import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  BarcodeScanner,
  BarcodeScannerDispatchProps,
  BarcodeScannerStateProps,
} from "components/BarcodeScanner/BarcodeScanner";
import {
  RootState,
  handleMountScanner,
  handleClickScannerCancel,
  handlePlayScannerVideo,
} from "widgets/BhandaraCheckin/store";

const mapStateToProps: MapStateToProps<
  BarcodeScannerStateProps,
  {},
  RootState
> = ({ barcodeScanner }) => barcodeScanner;

const mapDispatchToProps: MapDispatchToProps<BarcodeScannerDispatchProps, {}> =
  (dispatch) => {
    return {
      onCancel: () => dispatch<any>(handleClickScannerCancel()),
      onMount: () => dispatch<any>(handleMountScanner()),
      onPlayVideo: () => dispatch<any>(handlePlayScannerVideo()),
      onScan: console.log,
    };
  };

export const BarcodeScannerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(BarcodeScanner);
