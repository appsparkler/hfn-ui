import { BhandaraCheckinAPIs, PageEnum } from "../../types";
import { SnackbarConnected } from "./SnackbarConnected";
import { pages } from "widgets/BhandaraCheckin/routing";
import { Box } from "@mui/material";
import { BarcodeScannerConnected } from "./BarcodeScannerConnected";
import { AppStatusIndicator } from "components";
import { ConnectedAppUpdater } from "../AppUpdater";

export type BhandaraCheckinWidgetProps = {
  apis: BhandaraCheckinAPIs;
};

export type BhandaraCheckinViewStateProps = {
  renderApp?: boolean;
  renderScanner?: boolean;
  page?: PageEnum;
};

export const BhandaraCheckinView = ({
  page = PageEnum.Home,
  renderApp = false,
  renderScanner,
}: BhandaraCheckinViewStateProps) => {
  const Component = (pages as any)[page] as any;

  return (
    <Box>
      {renderApp ? (
        <>
          <Component />
          {renderScanner ? <BarcodeScannerConnected /> : null}
        </>
      ) : (
        <ConnectedAppUpdater />
      )}
      <Box position="fixed" left={2} bottom={2}>
        <AppStatusIndicator />
      </Box>
      <SnackbarConnected />
    </Box>
  );
};
