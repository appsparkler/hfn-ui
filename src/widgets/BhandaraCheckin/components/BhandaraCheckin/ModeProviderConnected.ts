import { connect, MapStateToProps } from "react-redux";
import { ModeProvider, ModeProviderStateProps } from "../../../../components";
import { Modes, RootState } from "../../store";

const mapStateToProps: MapStateToProps<ModeProviderStateProps, {}, RootState> =
  ({ mode }) => ({
    mode: mode === Modes.DARK ? "dark" : "light",
  });

export const ModeProviderConnected = connect(mapStateToProps)(ModeProvider);
