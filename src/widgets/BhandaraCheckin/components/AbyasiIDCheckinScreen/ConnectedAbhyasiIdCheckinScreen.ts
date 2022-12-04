import { connect, MapStateToProps } from "react-redux";
import {
  mapAbhyasiIDCheckinScreenDispatchToProps,
  RootState,
} from "widgets/BhandaraCheckin/store";
import { IAbhyasiIDCheckinScreenStateProps } from "widgets/BhandaraCheckin/types";
import { AbhyasiIDCheckinScreen } from "./AbhyasiIDCheckinScreen";

const mapStateToProps: MapStateToProps<
  IAbhyasiIDCheckinScreenStateProps,
  {},
  RootState
> = (state, ownProps) => state.abhyasiIdCheckinScreen;

export const ConnectedAbhyasiIdCheckinScreen = connect(
  mapStateToProps,
  mapAbhyasiIDCheckinScreenDispatchToProps
)(AbhyasiIDCheckinScreen);
