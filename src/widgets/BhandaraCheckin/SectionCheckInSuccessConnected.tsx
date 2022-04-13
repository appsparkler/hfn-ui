import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState, bhandaraCheckinSlice, resetAppState } from "./store";
import {
  SectionCheckinSuccess,
  SectionCheckinStateProps,
  SectionCheckinDispatchProps,
} from "./SectionCheckInSuccess";
import { Action } from "@reduxjs/toolkit";

const mapStateToProps: MapStateToProps<
  SectionCheckinStateProps,
  {},
  RootState
> = () => ({});

const mapDispatchToProps: MapDispatchToProps<SectionCheckinDispatchProps, {}> =
  (dispatch) => {
    return {
      onClickReturn: () => {
        dispatch(bhandaraCheckinSlice.actions.goToMain());
        dispatch(resetAppState() as unknown as Action<any>);
      },
    };
  };

export const SectionCheckinSuccessConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionCheckinSuccess);
