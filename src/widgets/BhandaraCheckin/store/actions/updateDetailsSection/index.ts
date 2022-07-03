import { MapDispatchToProps } from "react-redux";
import { SectionUpdateDetailsDispatchProps } from "widgets/BhandaraCheckin/SectionUpdateDetailsV2/SectionUpdateDetailsV2";
import {
  bhandaraCheckinActions,
  mainSectionActions,
  updateDetailsV2Actions,
} from "../../slices";

export const updateDetailsSectionMapDispatchToProps: MapDispatchToProps<
  SectionUpdateDetailsDispatchProps,
  {}
> = (dispatch) => ({
  onChange: (userDetails) => {
    dispatch(updateDetailsV2Actions.setState({ userDetails }));
  },
  onClickCancel: () => {
    dispatch(mainSectionActions.reset());
    dispatch(bhandaraCheckinActions.goToMain());
  },
  onClickCheckin: console.log,
});
