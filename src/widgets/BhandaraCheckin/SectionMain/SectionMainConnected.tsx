import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  startCheckin,
  RootState,
  handleChangeCheckinWithValue,
  handleSwitchMode,
  Modes,
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
      isDarkMode: mode === Modes.DARK ? true : false,
    };
  };

const mapDispatchToProps: MapDispatchToProps<SectionMainDispatchProps, {}> = (
  dispatch
) => {
  return {
    onClickScan: console.log,
    onSwitchScanner: console.log,
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
