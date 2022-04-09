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
> = ({ bhandaraCheckin: { userDetails, currentSection } }) => {
  return {
    show: currentSection === CurrentSectionEnum.UPDATE_DETAILS,
    userDetails,
    isProcessing: false,
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
    onChange: () => {},
  };
};

export const SectionUpdateDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionUpdateDetails);
