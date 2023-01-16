import { connect, MapStateToProps } from "react-redux";
import { RootState } from "widgets/BhandaraCheckin/store";
import { mapAbhyasiIDCheckinScreenDispatchToProps } from "widgets/BhandaraCheckin/store/actions";
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
