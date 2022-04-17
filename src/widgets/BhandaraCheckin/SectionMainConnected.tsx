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
    onClickStart: async (userId) => {
      const res = await dispatch(startCheckin() as unknown as Action<any>);
      console.log(res);
    },
  };
};

export const SectionMainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMain);
