import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "./store";
import { Snackbar, SnackbarProps } from "../../components";
import { snackbarSlice } from "../../components/Snackbar/snackbarSlice";

const mapStateToProps: MapStateToProps<SnackbarProps, {}, RootState> = ({
  snackbar: { open, vertical, horizontal, severity, children },
}) => {
  return {
    open,
    vertical,
    horizontal,
    severity,
    children,
  };
};

const mapDispatchToProps: MapDispatchToProps<SnackbarProps, {}> = (
  dispatch
) => {
  return {
    onClose: () => dispatch(snackbarSlice.actions.closeSnackbar),
  };
};

export const SectionUpdateDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Snackbar);
