import { Action } from "@reduxjs/toolkit";
import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../store";
import {
  getMainSectionInitialState,
  mainSectionSlice,
} from "../store/slices/mainSectionSlice";
import { startCheckin } from "../store/actions";
import {
  SectionMain,
  SectionMainDispatchProps,
  SectionMainStateProps,
} from "./SectionMain";

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
    },
  };
};

export const SectionMainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMain);
