import { SectionMainConnected } from "./SectionMainConnected";
import { SectionUpdateDetailsConnected } from "./SectionUpdateDetailsConnected";
import { SectionCheckinSuccessConnected } from "./SectionCheckInSuccessConnected";
import { BhandaraCheckinAPIs } from "./types";

export type BhandaraCheckinWidgetProps = {
  apis: BhandaraCheckinAPIs;
};

export type BhandaraCheckinViewStateProps = {
  showMain: boolean;
  showUpdateDetails: boolean;
  showCheckinSuccess: boolean;
};

export const BhandaraCheckinView = ({
  showMain,
  showUpdateDetails,
  showCheckinSuccess,
}: BhandaraCheckinViewStateProps) => {
  return (
    <>
      {showMain ? <SectionMainConnected /> : null}
      {showUpdateDetails ? <SectionUpdateDetailsConnected /> : null}
      {showCheckinSuccess ? <SectionCheckinSuccessConnected /> : null}
    </>
  );
};
