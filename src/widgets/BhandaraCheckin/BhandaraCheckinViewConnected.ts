import { connect, MapStateToProps } from "react-redux";
import { RootState } from "./store";
import {
  BhandaraCheckinView,
  BhandaraCheckinViewStateProps,
} from "./BhandaraCheckinView";
import { CurrentSectionEnum } from "./types";

const mapStateToProps: MapStateToProps<
  BhandaraCheckinViewStateProps,
  {},
  RootState
> = ({ bhandaraCheckin: { userDetails, currentSection } }) => {
  return {
    showMain: currentSection === CurrentSectionEnum.MAIN,
    showUpdateDetails: currentSection === CurrentSectionEnum.UPDATE_DETAILS,
    showCheckinSuccess: currentSection === CurrentSectionEnum.CHECKIN_SUCCESS,
  };
};

export const BhandaraCheckinViewConnected =
  connect(mapStateToProps)(BhandaraCheckinView);
