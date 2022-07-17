import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  BarcodeScannerV0,
  BarcodeScannerV0DispatchProps,
  BarcodeScannerV0StateProps,
} from "components/BarcodeScannerV0/BarcodeScanner";
import {
  RootState,
  handleMountScanner,
  handleClickScannerCancel,
  handlePlayScannerVideo,
  handleScanV2,
} from "widgets/BhandaraCheckinV0/store";

const mapStateToProps: MapStateToProps<
  BarcodeScannerV0StateProps,
  {},
  RootState
> = ({ barcodeScanner }) => barcodeScanner;

const mapDispatchToProps: MapDispatchToProps<
  BarcodeScannerV0DispatchProps,
  {}
> = (dispatch) => {
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
)(BarcodeScannerV0);
