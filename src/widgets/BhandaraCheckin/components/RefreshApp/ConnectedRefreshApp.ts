import { connect, MapStateToProps } from "react-redux";
import { RootState } from "widgets/BhandaraCheckin/store";
import { RefreshAppStateProps } from "widgets/BhandaraCheckin/types";
import { RefreshApp } from "./RefreshApp";
import { mapRefreshAppDispatchToProps } from "widgets/BhandaraCheckin/store/actions/mapRefreshAppDispatchToProps";

const mapStateToProps: MapStateToProps<RefreshAppStateProps, {}, RootState> =
  () => ({});

export const ConnectedRefreshApp = connect(
  mapStateToProps,
  mapRefreshAppDispatchToProps
)(RefreshApp);
