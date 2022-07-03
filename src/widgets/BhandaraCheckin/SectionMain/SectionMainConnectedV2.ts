import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import { RootState } from "widgets/BhandaraCheckin/store";
import {
  SectionMain,
  SectionMainDispatchProps,
  SectionMainStateProps,
} from "./SectionMain";
import { mapDispatchToProps } from "./mapDispatchToProps";

const mapStateToProps: MapStateToProps<SectionMainStateProps, {}, RootState> =
  ({ mainSection }) => mainSection;

export const SectionMainConnectedV2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMain);
