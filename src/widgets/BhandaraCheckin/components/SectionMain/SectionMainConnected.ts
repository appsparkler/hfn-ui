import { connect, MapStateToProps } from "react-redux";
import { RootState, mapDispatchToProps } from "widgets/BhandaraCheckin/store";
import { SectionMain, SectionMainStateProps } from "./SectionMain";
// import { mapDispatchToProps } from "./mapDispatchToProps";

const mapStateToProps: MapStateToProps<SectionMainStateProps, {}, RootState> =
  ({ mainSection }) => mainSection;

export const SectionMainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMain);
