import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState, bhandaraCheckinSlice } from "../../store";
import {
  SectionCheckinSuccess,
  SectionCheckinStateProps,
  SectionCheckinDispatchProps,
} from "./SectionCheckInSuccess";
import { CurrentSectionEnum } from "./types";

const mapStateToProps: MapStateToProps<
  SectionCheckinStateProps,
  {},
  RootState
> = ({ bhandaraCheckin }) => {
  return {
    show: bhandaraCheckin.currentSection === CurrentSectionEnum.UPDATE_DETAILS,
  };
};

const mapDispatchToProps: MapDispatchToProps<SectionCheckinDispatchProps, {}> =
  (dispatch) => {
    return {
      onClickReturn: () => dispatch(bhandaraCheckinSlice.actions.goToMain()),
    };
  };

export const SectionCheckinSuccessConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionCheckinSuccess);
