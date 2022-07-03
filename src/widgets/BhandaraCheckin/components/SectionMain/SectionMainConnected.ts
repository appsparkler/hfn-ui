import { connect, MapStateToProps } from "react-redux";
import { RootState } from "widgets/BhandaraCheckin/store";
import { SectionMain, SectionMainStateProps } from "./SectionMain";
import { mapDispatchToProps } from "widgets/BhandaraCheckin/store/actions/mainSectionMapDispatchToProps";

const mapStateToProps: MapStateToProps<SectionMainStateProps, {}, RootState> =
  ({ mainSection }) => mainSection;

export const SectionMainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMain);
