import { connect, MapStateToProps } from "react-redux";
import {
  SectionUpdateDetailsV2,
  SectionUpdateDetailsStateProps,
} from "./SectionUpdateDetailsV2";
import { RootState, updateDetailsSectionMapDispatchToProps } from "../store";

const mapStateToProps: MapStateToProps<
  SectionUpdateDetailsStateProps,
  {},
  RootState
> = ({ updateDetailsV2Section }) => updateDetailsV2Section;

export const SectionUpdateDetailsConnected = connect(
  mapStateToProps,
  updateDetailsSectionMapDispatchToProps
)(SectionUpdateDetailsV2);
