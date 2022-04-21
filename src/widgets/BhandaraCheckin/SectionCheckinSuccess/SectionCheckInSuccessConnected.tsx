import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../store";
import {
  SectionCheckinSuccess,
  SectionCheckinStateProps,
  SectionCheckinDispatchProps,
} from "./SectionCheckInSuccess";
import { bhandaraCheckinSlice } from "../BhandaraCheckin/bhandaraCheckinSlice";
import { resetAppStateAction } from "../store";

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
        dispatch(resetAppStateAction() as any);
      },
    };
  };

export const SectionCheckinSuccessConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionCheckinSuccess);
