import { BhandaraCheckinAPIs, PageEnum } from "../../types";
import { SnackbarConnected } from "./SnackbarConnected";
import { pages } from "widgets/BhandaraCheckin/routing";
import { Box } from "@mui/material";
import { BarcodeScannerConnected } from "./BarcodeScannerConnected";
import { AppStatusIndicator } from "components";
import { ConnectedAppUpdater } from "../AppUpdater";
import { noop } from "lodash/fp";
import { useEffect } from "react";

export type BhandaraCheckinWidgetProps = {
  apis: BhandaraCheckinAPIs;
};

export type BhandaraCheckinViewStateProps = {
  renderApp?: boolean;
  renderScanner?: boolean;
  page?: PageEnum;
};

export interface BhandaraCheckinViewActionProps {
  onMount?: () => void;
  onUnmount?: () => void;
}

export const BhandaraCheckinView = ({
  page = PageEnum.Home,
  renderApp = false,
  renderScanner,
  onMount = noop,
  onUnmount = noop,
}: BhandaraCheckinViewStateProps & BhandaraCheckinViewActionProps) => {
  const Component = (pages as any)[page] as any;

  useEffect(() => {
    onMount();

    return () => {
      onUnmount();
    };
  }, [onMount, onUnmount]);

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
