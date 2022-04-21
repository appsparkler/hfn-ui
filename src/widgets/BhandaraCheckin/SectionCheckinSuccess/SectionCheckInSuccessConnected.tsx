import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../store";
import {
  SectionCheckinSuccess,
  SectionCheckinStateProps,
  SectionCheckinDispatchProps,
} from "./SectionCheckInSuccess";
import { resetAppState } from "../store";

const mapStateToProps: MapStateToProps<
  SectionCheckinStateProps,
  {},
  RootState
> = () => ({});

const mapDispatchToProps: MapDispatchToProps<SectionCheckinDispatchProps, {}> =
  (dispatch) => {
    return {
      onClickReturn: () => {
        resetAppState(dispatch);
      },
    };
  };

export const SectionCheckinSuccessConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionCheckinSuccess);
