import { Action } from "@reduxjs/toolkit";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState, bhandaraCheckinSlice, startCheckIn } from "./store";
import { startCheckin } from "./store/slices/actions/startCheckin";
import {
  SectionMain,
  SectionMainDispatchProps,
  SectionMainStateProps,
} from "./SectionMain";

const mapStateToProps: MapStateToProps<SectionMainStateProps, {}, RootState> =
  ({
    bhandaraCheckin: {
      registeringWithValue,
      currentSection,
      helperText,
      startCheckInError,
      startCheckinIsProcessing,
    },
  }) => {
    return {
      error: startCheckInError,
      helperText,
      value: registeringWithValue,
      isProcessing: startCheckinIsProcessing,
    };
  };

const mapDispatchToProps: MapDispatchToProps<SectionMainDispatchProps, {}> = (
  dispatch
) => {
  return {
    onChange: (value) =>
      dispatch(bhandaraCheckinSlice.actions.changeRegisteringWithValue(value)),
    onClickStart: (userId) => {
      dispatch(startCheckin() as unknown as Action<any>);
      // dispatch(startCheckIn() as unknown as Action<any>);
    },
  };
};

export const SectionMainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMain);
