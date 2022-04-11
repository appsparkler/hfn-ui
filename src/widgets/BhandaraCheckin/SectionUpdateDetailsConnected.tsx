import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { bhandaraCheckinSlice, checkinUser, RootState } from "./store";
import {
  SectionUpdateDetails,
  SectionUpdateDetailsDispatchProps,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetails";
import { Action } from "@reduxjs/toolkit";
import { snackbarSlice } from "../../components/Snackbar/snackbarSlice";

const mapStateToProps: MapStateToProps<
  SectionUpdateDetailsStateProps,
  {},
  RootState
> = ({ bhandaraCheckin: { userDetails, updateDetailsProcessing } }) => {
  return {
    userDetails,
    isProcessing: updateDetailsProcessing,
  };
};

const mapDispatchToProps: MapDispatchToProps<
  SectionUpdateDetailsDispatchProps,
  {}
> = (dispatch) => {
  return {
    onClickCheckin: () => dispatch(checkinUser() as unknown as Action<any>),
    onClickCancel: () => dispatch(bhandaraCheckinSlice.actions.goToMain()),
    onChange: (userDetails) => {
      dispatch(snackbarSlice.actions.closeSnackbar());
      dispatch(bhandaraCheckinSlice.actions.setUserDetails(userDetails));
    },
  };
};

export const SectionUpdateDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionUpdateDetails);
