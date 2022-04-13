import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { bhandaraCheckinSlice, RootState } from "./store";
import {
  SectionUpdateDetails,
  SectionUpdateDetailsDispatchProps,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetails";
// import { Action } from "@reduxjs/toolkit";
import { snackbarSlice } from "../../components/Snackbar/snackbarSlice";
import { updateDetailsSectionSlice } from "./store/slices/updateDetailsSectionSlice";

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
    onClickCancel: () => dispatch(bhandaraCheckinSlice.actions.goToMain()),
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
