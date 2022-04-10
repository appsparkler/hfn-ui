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
> = ({
  bhandaraCheckin: { userDetails, currentSection, updateDetailsWarning },
}) => {
  return {
    show: currentSection === CurrentSectionEnum.UPDATE_DETAILS,
    userDetails,
    isProcessing: false,
    warning: updateDetailsWarning,
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
    onChange: (userDetails) =>
      dispatch(bhandaraCheckinSlice.actions.setUserDetails(userDetails)),
  };
};

export const SectionUpdateDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionUpdateDetails);
