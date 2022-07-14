import { connect, MapStateToProps } from "react-redux";
import { themes } from "widgets/BhandaraCheckin/constants";
import { ModeProvider, ModeProviderStateProps } from "../../../../components";
import { Modes, RootState } from "../../store";

const mapStateToProps: MapStateToProps<ModeProviderStateProps, {}, RootState> =
  ({ mode }) => ({
    mode: mode === Modes.DARK ? "dark" : "light",
    themes,
  });

export const ModeProviderConnected = connect(mapStateToProps)(ModeProvider);
