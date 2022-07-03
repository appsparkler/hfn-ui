import { BhandaraCheckinAPIs, PageEnum } from "../../types";
import { SnackbarConnected } from "./SnackbarConnected";
import { pages } from "widgets/BhandaraCheckin/routing";
import { Box } from "@mui/material";
import { BarcodeScannerConnected } from "./BarcodeScannerConnected";

export type BhandaraCheckinWidgetProps = {
  apis: BhandaraCheckinAPIs;
};

export type BhandaraCheckinViewStateProps = {
  renderScanner?: boolean;
  page?: PageEnum;
};

export const BhandaraCheckinView = ({
  page = PageEnum.Home,
  renderScanner,
}: BhandaraCheckinViewStateProps) => {
  const Component = (pages as any)[page] as any;
  return (
    <Box>
      <Component />
      <SnackbarConnected />
      {renderScanner ? <BarcodeScannerConnected /> : null}
    </Box>
  );
};
