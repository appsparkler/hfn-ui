import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../store";
import { Snackbar, SnackbarProps } from "../../../components";
import { snackbarSlice } from "../store/slices/snackbarSlice";

const mapStateToProps: MapStateToProps<SnackbarProps, {}, RootState> = ({
  snackbar: { open, vertical, horizontal, severity, children, variant },
}) => {
  return {
    open,
    vertical,
    horizontal,
    severity,
    children,
    variant,
  };
};

const mapDispatchToProps: MapDispatchToProps<SnackbarProps, {}> = (
  dispatch
) => {
  return {
    onClose: () => dispatch(snackbarSlice.actions.closeSnackbar()),
  };
};

export const SnackbarConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Snackbar);
