import { connect } from "react-redux";
import { MapStateToProps } from "react-redux";
import { RootState } from "widgets/BhandaraCheckin/store";
import { mapMultiCheckinScreenDispatchToProps } from "widgets/BhandaraCheckin/store/actions/mapMultiCheckinScreenDispatchToProps";
import { MultiCheckinScreenStateProps } from "widgets/BhandaraCheckin/types";
import { MultiCheckinScreen } from "./MultiCheckinScreen";

const mapMultiCheckinScreenStateToProps: MapStateToProps<
  MultiCheckinScreenStateProps,
  {},
  RootState
> = (state) => state.multiCheckinScreen;

export const ConnectedMultiCheckinScreen = connect(
  mapMultiCheckinScreenStateToProps,
  mapMultiCheckinScreenDispatchToProps
)(MultiCheckinScreen);
