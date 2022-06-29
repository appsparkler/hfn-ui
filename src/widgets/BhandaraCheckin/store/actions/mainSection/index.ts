import { MapDispatchToProps } from "react-redux";
import {
  mainSectionActions,
  getMainSectionInitialState,
} from "widgets/BhandaraCheckin/store";
import { SectionMainDispatchProps } from "widgets/BhandaraCheckin/SectionMain/SectionMain";

export const mainSectionMapDispatchToProps: MapDispatchToProps<
  SectionMainDispatchProps,
  {}
> = (dispatch) => ({
  onChange: (updatedValue) => {
    dispatch(
      mainSectionActions.setState({
        ...getMainSectionInitialState(),
        value: updatedValue,
      })
    );
  },
  onClickScan: () => {},
  onClickStart: () => {},
  onSwitchMode: () => {},
  onSwitchScanner: () => {},
});
