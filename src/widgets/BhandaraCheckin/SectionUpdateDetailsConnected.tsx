import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { bhandaraCheckinSlice, resetAppState, RootState } from "./store";
import {
  SectionUpdateDetails,
  SectionUpdateDetailsDispatchProps,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetails";
import { snackbarSlice } from "../../components/Snackbar/snackbarSlice";
import { updateDetailsSectionSlice } from "./store/slices/updateDetailsSectionSlice";
import { Action } from "@reduxjs/toolkit";

const mapStateToProps: MapStateToProps<
  SectionUpdateDetailsStateProps,
  {},
  RootState
> = ({ updateDetailsSection }) => updateDetailsSection;

const mapDispatchToProps: MapDispatchToProps<
  SectionUpdateDetailsDispatchProps,
  {}
> = (dispatch) => {
  return {
    onClickCheckin: () => {
      // dispatch(checkinUser() as unknown as Action<any>)
    },
    onClickCancel: () => dispatch(resetAppState() as unknown as Action<any>),
    onChange: (userDetails) => {
      dispatch(snackbarSlice.actions.closeSnackbar());
      dispatch(
        updateDetailsSectionSlice.actions.setState({
          userDetails,
        })
      );
    },
  };
};

export const SectionUpdateDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionUpdateDetails);
