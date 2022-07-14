import { connect, MapStateToProps } from "react-redux";
import {
  RootState,
  mainSectionMapDispatchToProps,
} from "widgets/BhandaraCheckinV0/store";
import { SectionMain, SectionMainStateProps } from "./SectionMain";

const mapStateToProps: MapStateToProps<SectionMainStateProps, {}, RootState> =
  ({ mainSection }) => mainSection;

export const SectionMainConnectedV2 = connect(
  mapStateToProps,
  mainSectionMapDispatchToProps
)(SectionMain);
