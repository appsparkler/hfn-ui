import { SectionMainConnected } from "../SectionMain/SectionMainConnected";
import { SectionUpdateDetailsConnected } from "../SectionUpdateDetails/SectionUpdateDetailsConnected";
import { SectionCheckinSuccessConnected } from "../SectionCheckinSuccess/SectionCheckInSuccessConnected";
import { BhandaraCheckinAPIs, CurrentSectionEnum } from "../types";
import { SnackbarConnected } from "./SnackbarConnected";
import { useMemo } from "react";
import { Box } from "@mui/material";
// import { BarcodeScanner } from "../../../components/BarcodeScanner/BarcodeScanner";

export type BhandaraCheckinWidgetProps = {
  apis: BhandaraCheckinAPIs;
};

export type BhandaraCheckinViewStateProps = {
  renderScanner?: boolean;
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
    <Box>
      {showMain ? <SectionMainConnected /> : null}
      {showUpdateDetails ? <SectionUpdateDetailsConnected /> : null}
      {showCheckinSuccess ? <SectionCheckinSuccessConnected /> : null}
      {/* {renderScanner ? <BarcodeScanner />} */}
      <SnackbarConnected />
    </Box>
  );
};
