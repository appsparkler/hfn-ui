import { Action } from "@reduxjs/toolkit";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState, getMainSectionInitialState } from "./store";
import { startCheckin } from "./store/actions/startCheckin";
import {
  SectionMain,
  SectionMainDispatchProps,
  SectionMainStateProps,
} from "./SectionMain";
import { mainSectionSlice } from "./store/slices/mainSectionSlice";

const mapStateToProps: MapStateToProps<SectionMainStateProps, {}, RootState> =
  ({ mainSection }) => mainSection;

const mapDispatchToProps: MapDispatchToProps<SectionMainDispatchProps, {}> = (
  dispatch
) => {
  return {
    onChange: (value) => {
      dispatch(
        mainSectionSlice.actions.setState({
          ...getMainSectionInitialState(),
          value,
        })
      );
    },
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
