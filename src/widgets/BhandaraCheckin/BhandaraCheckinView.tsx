import { SectionMainConnected } from "./SectionMainConnected";
import { SectionUpdateDetailsConnected } from "./SectionUpdateDetailsConnected";
import { SectionCheckinSuccessConnected } from "./SectionCheckInSuccessConnected";
import { BhandaraCheckinAPIs, CurrentSectionEnum } from "./types";
import { SnackbarConnected } from "./SnackbarConnected";
import { useMemo } from "react";

export type BhandaraCheckinWidgetProps = {
  apis: BhandaraCheckinAPIs;
};

export type BhandaraCheckinViewStateProps = {
  currentSection: CurrentSectionEnum;
};

export const BhandaraCheckinView = ({
  currentSection,
}: BhandaraCheckinViewStateProps) => {
  const { showMain, showUpdateDetails, showCheckinSuccess } = useMemo<{
    showMain: boolean;
    showUpdateDetails: boolean;
    showCheckinSuccess: boolean;
  }>(
    () => ({
      showMain: currentSection === CurrentSectionEnum.MAIN,
      showUpdateDetails: currentSection === CurrentSectionEnum.UPDATE_DETAILS,
      showCheckinSuccess: currentSection === CurrentSectionEnum.CHECKIN_SUCCESS,
    }),
    [currentSection]
  );
  return (
    <>
      {showMain ? <SectionMainConnected /> : null}
      {showUpdateDetails ? <SectionUpdateDetailsConnected /> : null}
      {showCheckinSuccess ? <SectionCheckinSuccessConnected /> : null}
      <SnackbarConnected />
    </>
  );
};
