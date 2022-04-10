import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { bhandaraCheckinSlice, checkinUser, RootState } from "./store";
import {
  SectionUpdateDetails,
  SectionUpdateDetailsDispatchProps,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetails";
import { Action } from "@reduxjs/toolkit";

const mapStateToProps: MapStateToProps<
  SectionUpdateDetailsStateProps,
  {},
  RootState
> = ({
  bhandaraCheckin: {
    userDetails,
    currentSection,
    updateDetailsWarning,
    updateDetailsProcessing,
  },
}) => {
  return {
    userDetails,
    isProcessing: updateDetailsProcessing,
    warning: updateDetailsWarning,
  };
};

const mapDispatchToProps: MapDispatchToProps<
  SectionUpdateDetailsDispatchProps,
  {}
> = (dispatch) => {
  return {
    onClickCheckin: () => dispatch(checkinUser() as unknown as Action<any>),
    onClickCancel: () => dispatch(bhandaraCheckinSlice.actions.goToMain()),
    onChange: (userDetails) =>
      dispatch(bhandaraCheckinSlice.actions.setUserDetails(userDetails)),
  };
};

export const SectionUpdateDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionUpdateDetails);
