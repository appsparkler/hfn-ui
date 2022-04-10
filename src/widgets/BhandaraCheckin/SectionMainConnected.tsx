import { Action } from "@reduxjs/toolkit";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState, bhandaraCheckinSlice, startCheckIn } from "./store";
import {
  SectionMain,
  SectionMainDispatchProps,
  SectionMainStateProps,
} from "./SectionMain";
import { CurrentSectionEnum } from "./types";

const mapStateToProps: MapStateToProps<SectionMainStateProps, {}, RootState> =
  ({
    bhandaraCheckin: {
      registeringWithValue,
      isProcessing,
      currentSection,
      helperText,
    },
  }) => {
    return {
      helperText,
      value: registeringWithValue,
      isProcessing: isProcessing,
      show: currentSection === CurrentSectionEnum.MAIN,
    };
  };

const mapDispatchToProps: MapDispatchToProps<SectionMainDispatchProps, {}> = (
  dispatch
) => {
  return {
    onChange: (value) =>
      dispatch(bhandaraCheckinSlice.actions.changeRegisteringWithValue(value)),
    onClickStart: (userId) =>
      dispatch(startCheckIn() as unknown as Action<any>),
  };
};

export const SectionMainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMain);
