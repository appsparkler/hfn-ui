import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  SectionMultipleCheckin,
  SectionCheckinStateProps,
  SectionCheckinDispatchProps,
} from "./SectionMultipleCheckin";
import { resetAppState, RootState } from "../store";

const mapStateToProps: MapStateToProps<
  SectionCheckinStateProps,
  {},
  RootState
> = () => ({});

const mapDispatchToProps: MapDispatchToProps<SectionCheckinDispatchProps, {}> =
  (dispatch) => {
    return {
      onClickReturn: () => {
        dispatch<any>(resetAppState());
      },
    };
  };

export const SectionCheckinSuccessConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMultipleCheckin);
