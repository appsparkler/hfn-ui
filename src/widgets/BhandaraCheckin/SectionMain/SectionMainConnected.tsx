import { connect, MapDispatchToProps, MapStateToProps } from "react-redux";
import {
  SectionMain,
  SectionMainDispatchProps,
  SectionMainStateProps,
} from "./SectionMain";

type SectionMainMapStateToProps = MapStateToProps<
  SectionMainStateProps,
  {},
  { mainSection: SectionMainStateProps }
>;

const mapStateToProps: SectionMainMapStateToProps = ({ mainSection }) =>
  mainSection;

const mapDispatchToProps: MapDispatchToProps<
  SectionMainDispatchProps,
  SectionMainDispatchProps
> = (dispatch, dispatchProps) => dispatchProps;

export const SectionMainConnected = connect(
  mapStateToProps,
  mapDispatchToProps
)(SectionMain);
