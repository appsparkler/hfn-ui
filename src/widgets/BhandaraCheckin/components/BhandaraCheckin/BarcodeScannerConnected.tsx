import { connect, MapStateToProps } from "react-redux";
import { BarcodeScanner, BarcodeScannerStateProps } from "components";
import { RootState } from "widgets/BhandaraCheckin/store";
import { barcodeScannerMapDispatchtToProps } from "widgets/BhandaraCheckin/store/actions/barcodeScannerMapDispatchToProps";

const mapStateToProps: MapStateToProps<
  BarcodeScannerStateProps,
  {},
  RootState
> = ({ barcodeScanner }) => barcodeScanner;

export const BarcodeScannerConnected = connect(
  mapStateToProps,
  barcodeScannerMapDispatchtToProps
)(BarcodeScanner);
