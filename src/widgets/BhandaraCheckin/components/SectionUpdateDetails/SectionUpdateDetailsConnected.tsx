import { connect, MapStateToProps } from "react-redux";
import {
  SectionUpdateDetails,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetails";
import { RootState } from "widgets/BhandaraCheckin/store";
import { updateDetailsSectionMapDispatchToProps } from "widgets/BhandaraCheckin/store/actions/updateDetailsSectionDispatchProps";

const mapStateToProps: MapStateToProps<
  SectionUpdateDetailsStateProps,
  {},
  RootState
> = ({ updateDetailsV2Section }) => updateDetailsV2Section;

export const SectionUpdateDetailsConnected = connect(
  mapStateToProps,
  updateDetailsSectionMapDispatchToProps
)(SectionUpdateDetails);
