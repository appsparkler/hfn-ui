import { BhandaraCheckinAPIs, CurrentSectionEnum } from "../types";
import { SnackbarConnected } from "./SnackbarConnected";
import { pages } from "../pages";
import { Box } from "@mui/material";

export type BhandaraCheckinWidgetProps = {
  apis: BhandaraCheckinAPIs;
};

export type LocationActionType =
  | "Home"
  | "UpdateDetails"
  | "CheckInSuccess"
  | "@@redux-first-router/NOT_FOUND";

export type BhandaraCheckinViewStateProps = {
  renderScanner?: boolean;
  locationActionType: LocationActionType;
  currentSection: CurrentSectionEnum;
};

export const BhandaraCheckinView = ({
  currentSection,
  renderScanner,
  locationActionType,
}: BhandaraCheckinViewStateProps) => {
  if (locationActionType === "@@redux-first-router/NOT_FOUND") {
    const Nf = pages.NotFound;
    return <Nf />;
  }
  const Component = pages[locationActionType];
  return (
    <Box>
      <Component />
      <SnackbarConnected />
    </Box>
  );
};
