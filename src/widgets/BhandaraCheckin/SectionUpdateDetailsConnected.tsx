import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "../../store";
import {
  SectionUpdateDetails,
  SectionUpdateDetailsDispatchProps,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetails";
import { CurrentSection } from "./types";

const mapStateToProps: MapStateToProps<
  SectionUpdateDetailsStateProps,
  {},
  RootState
> = ({ bhandaraCheckin }) => {
  return {
    show: bhandaraCheckin.currentSection === CurrentSection.UPDATE_DETAILS,
  };
};

const mapDispatchToProps: MapDispatchToProps<
  SectionUpdateDetailsDispatchProps,
  {}
> = () => {
  return {};
};

export const SectionUpdateDetailsConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionUpdateDetails);
