import { connect, MapStateToProps } from "react-redux";
import { RootState } from "widgets/BhandaraCheckin/store";
import { SectionMain } from "./SectionMain";
import { mapDispatchToProps } from "widgets/BhandaraCheckin/store/actions/mainSectionMapDispatchToProps";
import { SectionMainStateProps } from "widgets/BhandaraCheckin/types";

const mapStateToProps: MapStateToProps<SectionMainStateProps, {}, RootState> =
  ({ mainSection, env }) => ({
    env,
    ...mainSection,
  });

export const SectionMainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMain);
