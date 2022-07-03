import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  RootState,
  handleChangeCheckinWithValue,
  handleSwitchMode,
  Modes,
  handleSwitchScanner,
  handleClickScan,
} from "widgets/BhandaraCheckin/store";
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
    onClickScan: () => dispatch<any>(handleClickScan()),
    onSwitchScanner: (checked) => dispatch<any>(handleSwitchScanner(checked)),
    onChange: (value) => {
      dispatch<any>(handleChangeCheckinWithValue(value));
    },
    onClickStart: (value) => {},
    onSwitchMode: (checked) => dispatch<any>(handleSwitchMode(checked)),
  };
};

export const SectionMainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMain);
