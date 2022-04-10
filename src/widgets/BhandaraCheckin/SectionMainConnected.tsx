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
  ({ bhandaraCheckin }) => {
    return {
      value: bhandaraCheckin.registeringWithValue,
      isProcessing: bhandaraCheckin.isProcessing,
      show: bhandaraCheckin.currentSection === CurrentSectionEnum.MAIN,
    };
  };

const mapDispatchToProps: MapDispatchToProps<SectionMainDispatchProps, {}> = (
  dispatch
) => {
  return {
    onChange: (value) =>
      dispatch(bhandaraCheckinSlice.actions.changeRegisteringWithValue(value)),
    onClickStart: (userId) =>
      dispatch(startCheckIn(userId) as unknown as Action<any>),
  };
};

export const SectionMainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMain);
