import { MapDispatchToProps } from "react-redux";
import { SectionUpdateDetailsDispatchProps } from "widgets/BhandaraCheckin/SectionUpdateDetailsV2/SectionUpdateDetailsV2";

export const updateDetailsSectionMapDispatchToProps: MapDispatchToProps<
  SectionUpdateDetailsDispatchProps,
  {}
> = (dispatch) => ({
  onChange: console.log,
  onClickCancel: console.log,
  onClickCheckin: console.log,
});
