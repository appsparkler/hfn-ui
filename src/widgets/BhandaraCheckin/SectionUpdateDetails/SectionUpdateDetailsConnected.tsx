import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  SectionUpdateDetails,
  SectionUpdateDetailsDispatchProps,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetails";
import { resetAppState, RootState, updateDetailsCheckin } from "../store";
import { handleChangeUserDetails } from "../store/actions/handleChangeUserDetails";

const mapStateToProps: MapStateToProps<
  SectionUpdateDetailsStateProps,
  {},
  RootState
> = ({ updateDetailsSection }) => updateDetailsSection;

const mapDispatchToProps: MapDispatchToProps<
  SectionUpdateDetailsDispatchProps,
  {}
> = (dispatch) => {
  return {
    onClickCheckin: () => {
      dispatch<any>(updateDetailsCheckin());
    },
    onClickCancel: () => {
      resetAppState();
    },
    onChange: (userDetails) => {
      handleChangeUserDetails(userDetails);
    },
  };
};

export const SectionUpdateDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionUpdateDetails);
