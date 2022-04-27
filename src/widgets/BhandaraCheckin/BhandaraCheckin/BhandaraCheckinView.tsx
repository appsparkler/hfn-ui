import { SectionMainConnected } from "../SectionMain/SectionMainConnected";
import { SectionUpdateDetailsConnected } from "../SectionUpdateDetails/SectionUpdateDetailsConnected";
import { SectionCheckinSuccessConnected } from "../SectionCheckinSuccess/SectionCheckInSuccessConnected";
import { BhandaraCheckinAPIs, CurrentSectionEnum } from "../types";
import { SnackbarConnected } from "./SnackbarConnected";
import { useMemo } from "react";
import { Box } from "@mui/material";
import { SectionMultipleCheckinConnected } from "../SectionMultipleCheckin";

export type BhandaraCheckinWidgetProps = {
  apis: BhandaraCheckinAPIs;
};

export type BhandaraCheckinViewStateProps = {
  currentSection: CurrentSectionEnum;
};

export const BhandaraCheckinView = ({
  currentSection,
}: BhandaraCheckinViewStateProps) => {
  const {
    showMain,
    showUpdateDetails,
    showCheckinSuccess,
    showMultipleCheckin,
  } = useMemo<{
    showMain: boolean;
    showUpdateDetails: boolean;
    showCheckinSuccess: boolean;
    showMultipleCheckin: boolean;
  }>(
    () => ({
      showMain: currentSection === CurrentSectionEnum.MAIN,
      showUpdateDetails: currentSection === CurrentSectionEnum.UPDATE_DETAILS,
      showCheckinSuccess: currentSection === CurrentSectionEnum.CHECKIN_SUCCESS,
      showMultipleCheckin:
        currentSection === CurrentSectionEnum.MULTIPLE_CHECKIN,
    }),
    [currentSection]
  );
  return (
    <Box bgcolor={"white"}>
      {showMain ? <SectionMainConnected /> : null}
      {showUpdateDetails ? <SectionUpdateDetailsConnected /> : null}
      {showCheckinSuccess ? <SectionCheckinSuccessConnected /> : null}
      {showMultipleCheckin ? <SectionMultipleCheckinConnected /> : null}
      <SnackbarConnected />
    </Box>
  );
};
