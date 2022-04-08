import { Action } from "@reduxjs/toolkit";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store";
import { bhandaraCheckinSlice, someAction } from "../../store/slices";
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
      show: bhandaraCheckin.currentSection === CurrentSectionEnum.MAIN,
    };
  };

const mapDispatchToProps: MapDispatchToProps<SectionMainDispatchProps, {}> = (
  dispatch
) => {
  return {
    onChange: (value) =>
      dispatch(bhandaraCheckinSlice.actions.changeRegisteringWithValue(value)),
    onClickStart: () => dispatch(someAction({}) as unknown as Action<any>),
  };
};

export const SectionMainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMain);
