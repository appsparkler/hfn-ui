import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  startCheckin,
  RootState,
  handleChangeCheckinWithValue,
  handleSwitchScanner,
} from "../store";
import { handleClickScan } from "../store/actions/handleClickScan";
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
    onClickScan: () => dispatch<any>(handleClickScan()),
    onSwitchScanner: (checked) => dispatch<any>(handleSwitchScanner(checked)),
    onChange: (value) => {
      dispatch<any>(handleChangeCheckinWithValue(value));
    },
    onClickStart: (value) => {
      dispatch<any>(startCheckin(value));
    },
  };
};

export const SectionMainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMain);
