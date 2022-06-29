import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  SectionUpdateDetailsV2,
  SectionUpdateDetailsDispatchProps,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetailsV2";
import {
  resetAppState,
  RootState,
  handleChangeUserDetails,
  updateDetailsCheckin,
} from "../store";

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
      dispatch<any>(resetAppState());
    },
    onChange: (userDetails) => {
      dispatch<any>(handleChangeUserDetails(userDetails));
    },
  };
};

export const SectionUpdateDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionUpdateDetailsV2);
