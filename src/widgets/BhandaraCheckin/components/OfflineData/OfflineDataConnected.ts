import { connect, MapStateToProps } from "react-redux";
import { RootState } from "widgets/BhandaraCheckin/store";
import { OfflineDataStateProps } from "widgets/BhandaraCheckin/types/components/OfflineData";
import { OfflineData } from "./OfflineData";
import { mapOfflineDataDispatchToProps } from "widgets/BhandaraCheckin/store/actions/mapOfflineDataDispatchToProps";

export const mapStateToProps: MapStateToProps<
  OfflineDataStateProps,
  {},
  RootState
> = () => {
  return {};
};

export const OfflineDataConnected = connect(
  mapStateToProps,
  mapOfflineDataDispatchToProps
)(OfflineData);
