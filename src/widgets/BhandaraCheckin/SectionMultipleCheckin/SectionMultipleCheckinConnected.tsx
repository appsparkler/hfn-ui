import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  SectionMultipleCheckin,
  SectionMultiCheckinStateProps,
  SectionMultiCheckinDispatchProps,
} from "./SectionMultipleCheckin";
import { resetAppState, RootState } from "../store";

const mapStateToProps: MapStateToProps<
  SectionMultiCheckinStateProps,
  {},
  RootState
> = () => ({
  items: [],
});

const mapDispatchToProps: MapDispatchToProps<
  SectionMultiCheckinDispatchProps,
  {}
> = (dispatch) => {
  return {
    onClickReturn: () => {
      dispatch<any>(resetAppState());
    },
  };
};

export const SectionMultipleCheckinConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMultipleCheckin);
