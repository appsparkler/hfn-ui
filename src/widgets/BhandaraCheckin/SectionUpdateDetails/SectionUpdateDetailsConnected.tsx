import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState, updateDetailsCheckin } from "../store";
import {
  SectionUpdateDetails,
  SectionUpdateDetailsDispatchProps,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetails";
import { snackbarSlice } from "../../../components/Snackbar/snackbarSlice";
import { updateDetailsSectionSlice } from "./updateDetailsSectionSlice";
import { Action } from "@reduxjs/toolkit";
import { resetAppStateAction } from "../store/actions";

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
    onClickCancel: () =>
      dispatch(resetAppStateAction() as unknown as Action<any>),
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
