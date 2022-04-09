import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { bhandaraCheckinSlice, RootState } from "./store";
import {
  SectionUpdateDetails,
  SectionUpdateDetailsDispatchProps,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetails";
import { CurrentSectionEnum } from "./types";

const mapStateToProps: MapStateToProps<
  SectionUpdateDetailsStateProps,
  {},
  RootState
> = ({ bhandaraCheckin }) => {
  return {
    show: bhandaraCheckin.currentSection === CurrentSectionEnum.UPDATE_DETAILS,
  };
};

const mapDispatchToProps: MapDispatchToProps<
  SectionUpdateDetailsDispatchProps,
  {}
> = (dispatch) => {
  return {
    onClickCheckin: () =>
      dispatch(bhandaraCheckinSlice.actions.goToCheckinSuccess()),
    onClickCancel: () => dispatch(bhandaraCheckinSlice.actions.goToMain()),
  };
};

export const SectionUpdateDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionUpdateDetails);
