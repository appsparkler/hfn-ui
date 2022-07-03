import { connect, MapStateToProps } from "react-redux";
import {
  SectionUpdateDetailsV2,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetails";
import { RootState } from "widgets/BhandaraCheckin/store";
import { updateDetailsSectionMapDispatchToProps } from "widgets/BhandaraCheckin/store/actions/updateDetailsSection";

const mapStateToProps: MapStateToProps<
  SectionUpdateDetailsStateProps,
  {},
  RootState
> = ({ updateDetailsV2Section }) => updateDetailsV2Section;

export const SectionUpdateDetailsConnected = connect(
  mapStateToProps,
  updateDetailsSectionMapDispatchToProps
)(SectionUpdateDetailsV2);
