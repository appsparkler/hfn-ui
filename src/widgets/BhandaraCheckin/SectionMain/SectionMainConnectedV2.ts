import { connect, MapStateToProps } from "react-redux";
import {
  RootState,
  mainSectionMapDispatchToProps,
} from "widgets/BhandaraCheckin/store";
import { SectionMain, SectionMainStateProps } from "./SectionMain";

const mapStateToProps: MapStateToProps<SectionMainStateProps, {}, RootState> =
  ({ mainSection }) => mainSection;

export const SectionMainConnectedV2 = connect(
  mapStateToProps,
  mainSectionMapDispatchToProps
)(SectionMain);
