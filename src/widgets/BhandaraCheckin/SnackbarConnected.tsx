import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { bhandaraCheckinSlice, checkinUser, RootState } from "./store";
import { AppSnackbar, AppSnackbarProps } from "./Snackbar";
import { Action } from "@reduxjs/toolkit";

const mapStateToProps: MapStateToProps<AppSnackbarProps, {}, RootState> = ({
  bhandaraCheckin: {
    userDetails,
    currentSection,
    updateDetailsWarning,
    updateDetailsProcessing,
  },
}) => {
  return {};
};

const mapDispatchToProps: MapDispatchToProps<AppSnackbarProps, {}> = (
  dispatch
) => {
  return {};
};

export const SectionUpdateDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppSnackbar);
