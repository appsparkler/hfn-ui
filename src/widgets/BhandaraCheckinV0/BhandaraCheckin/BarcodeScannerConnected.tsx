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
  handleScanV2,
} from "widgets/BhandaraCheckinV0/store";

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
      onScan: (value) => dispatch<any>(handleScanV2(value)),
    };
  };

export const BarcodeScannerConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(BarcodeScanner);
