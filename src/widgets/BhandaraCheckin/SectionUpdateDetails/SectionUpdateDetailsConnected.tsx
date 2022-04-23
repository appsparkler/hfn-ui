import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState, updateDetailsCheckin } from "../store";
import {
  SectionUpdateDetails,
  SectionUpdateDetailsDispatchProps,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetails";
import { snackbarSlice } from "../../../components/Snackbar/snackbarSlice";
import { updateDetailsSectionSlice } from "../store/slices/updateDetailsSectionSlice";
import { Action } from "@reduxjs/toolkit";
import { resetAppState } from "../store/actions";

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
      dispatch(updateDetailsCheckin() as unknown as Action<any>);
    },
    onClickCancel: () => {
      resetAppState(dispatch);
    },
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
