import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { bhandaraCheckinSlice, RootState } from "./store";
import {
  SectionUpdateDetails,
  SectionUpdateDetailsDispatchProps,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetails";
import { CurrentSectionEnum, UserDetails } from "./types";

const mapStateToProps: MapStateToProps<
  SectionUpdateDetailsStateProps,
  {},
  RootState
> = ({ bhandaraCheckin }) => {
  return {
    show: bhandaraCheckin.currentSection === CurrentSectionEnum.UPDATE_DETAILS,
    userDetails: {
      fullName: {
        value: "",
      },
    } as UserDetails,
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
