import { connect, MapStateToProps } from "react-redux";
import {
  RootState,
  mainSectionMapDispatchToProps,
} from "widgets/BhandaraCheckin/store";
import { SectionMain, SectionMainStateProps } from "./SectionMain";

const mapStateToPropsV2: MapStateToProps<SectionMainStateProps, {}, RootState> =
  ({ mainSection }) => {
    return mainSection;
  };

export const SectionMainConnectedV2 = connect(
  mapStateToPropsV2,
  mainSectionMapDispatchToProps
)(SectionMain);
