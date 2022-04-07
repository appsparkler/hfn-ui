import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store";
import { bhandaraCheckinSlice } from "../../store/slices";
import {
  SectionMain,
  SectionMainDispatchProps,
  SectionMainStateProps,
} from "./SectionMain";
import { CurrentSection } from "./types";

const mapStateToProps: MapStateToProps<SectionMainStateProps, {}, RootState> =
  ({ bhandaraCheckin }) => {
    return {
      value: bhandaraCheckin.registeringWithValue,
      show: bhandaraCheckin.currentSection === CurrentSection.MAIN,
    };
  };

const mapDispatchToProps: MapDispatchToProps<SectionMainDispatchProps, {}> = (
  dispatch
) => {
  return {
    onChange: (value) =>
      dispatch(bhandaraCheckinSlice.actions.changeRegisteringWithValue(value)),
    onClickStart: () =>
      dispatch(bhandaraCheckinSlice.actions.goToUpdateDetails()),
  };
};

export const SectionMainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMain);
