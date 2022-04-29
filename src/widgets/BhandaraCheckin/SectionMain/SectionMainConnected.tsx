import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  startCheckin,
  RootState,
  handleChangeCheckinWithValue,
} from "../store";
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
