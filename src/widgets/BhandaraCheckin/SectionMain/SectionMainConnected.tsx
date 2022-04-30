import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  startCheckin,
  RootState,
  handleChangeCheckinWithValue,
  handleSwitchMode,
} from "../store";
import {
  SectionMain,
  SectionMainDispatchProps,
  SectionMainStateProps,
} from "./SectionMain";

const mapStateToProps: MapStateToProps<SectionMainStateProps, {}, RootState> =
  ({ mainSection, mode }) => {
    return {
      ...mainSection,
      isDarkMode: mode ? true : false,
    };
  };

const mapDispatchToProps: MapDispatchToProps<SectionMainDispatchProps, {}> = (
  dispatch
) => {
  return {
    onChange: (value) => {
      dispatch<any>(handleChangeCheckinWithValue(value));
    },
    onClickStart: (value) => {
      dispatch<any>(startCheckin(value));
    },
    onSwitchMode: (checked) => dispatch<any>(handleSwitchMode(checked)),
  };
};

export const SectionMainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMain);
