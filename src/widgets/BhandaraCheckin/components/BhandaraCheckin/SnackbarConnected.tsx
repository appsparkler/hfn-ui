import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store";
import { Snackbar, SnackbarProps } from "../../../../components";
import { snackbarActions } from "../../store";

const mapStateToProps: MapStateToProps<SnackbarProps, {}, RootState> = ({
  snackbar,
}) => snackbar;

const mapDispatchToProps: MapDispatchToProps<SnackbarProps, {}> = (
  dispatch
) => {
  return {
    onClose: () => dispatch(snackbarActions.closeSnackbar()),
  };
};

export const SnackbarConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(Snackbar);
