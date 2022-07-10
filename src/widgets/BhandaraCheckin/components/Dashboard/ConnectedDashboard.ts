import { connect, MapStateToProps } from "react-redux";
import { RootState } from "widgets/BhandaraCheckin/store";
import { OfflineDataStateProps } from "widgets/BhandaraCheckin/types/components/OfflineData";
import { Dashboard } from "./Dashboard";
import { mapOfflineDataDispatchToProps } from "widgets/BhandaraCheckin/store/actions/mapOfflineDataDispatchToProps";

export const mapStateToProps: MapStateToProps<
  OfflineDataStateProps,
  {},
  RootState
> = ({ offlineData }) => offlineData;

export const OfflineDataConnected = connect(
  mapStateToProps,
  mapOfflineDataDispatchToProps
)(Dashboard);
