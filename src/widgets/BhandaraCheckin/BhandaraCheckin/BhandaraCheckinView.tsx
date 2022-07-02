import { BhandaraCheckinAPIs, CurrentSectionEnum } from "../types";
import { SnackbarConnected } from "./SnackbarConnected";
import { pages } from "../pages";
import { Box } from "@mui/material";
import { NOT_FOUND } from "redux-first-router";

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
  page?: any;
};

export const BhandaraCheckinView = ({
  currentSection,
  page = "Home",
  renderScanner,
  locationActionType,
}: BhandaraCheckinViewStateProps) => {
  if (page === NOT_FOUND) {
    const Nf = pages.NotFound;
    return <Nf />;
  }
  const Component = (pages as any)[page] as any;
  return (
    <Box>
      <Component />
      <SnackbarConnected />
    </Box>
  );
};
