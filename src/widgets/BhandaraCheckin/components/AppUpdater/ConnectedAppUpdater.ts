import { connect, MapStateToProps } from "react-redux";
import { RootState } from "widgets/BhandaraCheckin/store";
import { AppUpdaterProps } from "widgets/BhandaraCheckin/types";
import { AppUpdater } from "./AppUpdater";

export const mapStateToProps: MapStateToProps<AppUpdaterProps, {}, RootState> =
  ({ appUpdaterProps }) => appUpdaterProps;

export const ConnectedAppUpdater = connect(mapStateToProps)(AppUpdater);
