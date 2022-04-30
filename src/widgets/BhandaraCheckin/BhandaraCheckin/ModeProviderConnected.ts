import { connect, MapStateToProps } from "react-redux";
import { ModeProvider, ModeProviderStateProps } from "../../../components";
import { RootState } from "../store";

const mapStateToProps: MapStateToProps<ModeProviderStateProps, {}, RootState> =
  ({ mode }) => ({
    mode: mode ? "dark" : "light",
  });

export const ModeProviderConnected = connect(mapStateToProps)(ModeProvider);
