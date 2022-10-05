import { BhandaraCheckinAPIs, PageEnum } from "../../types";
import { SnackbarConnected } from "./SnackbarConnected";
import { pages } from "widgets/BhandaraCheckin/routing";
import { Box } from "@mui/material";
import { BarcodeScannerConnected } from "./BarcodeScannerConnected";
import { AppStatusIndicator } from "components";
import { useEffect } from "react";
import { getAuth, signInAnonymously, signOut } from "firebase/auth";
import { noop } from "lodash/fp";
import { onUnmount } from "widgets/BhandaraCheckin/store/actions/barcodeScannerMapDispatchToProps/onUnmount";

export type BhandaraCheckinViewStateProps = {
  renderScanner?: boolean;
  page?: PageEnum;
};

export type BhandaraCheckinDispatchProps = {
  onMount?: typeof noop;
  onUnmount?: typeof noop;
};

export type BhandaraCheckinViewProps = BhandaraCheckinViewStateProps &
  BhandaraCheckinDispatchProps;

export const BhandaraCheckinView = ({
  page = PageEnum.Home,
  renderScanner,
  onMount = noop,
  onUnmount = noop,
}: BhandaraCheckinViewProps) => {
  const Component = (pages as any)[page] as any;

  useEffect(() => {
    onMount();
    return () => {
      onUnmount();
    };
  }, [onMount, onUnmount]);

  return (
    <Box>
      <Component />
      <SnackbarConnected />
      {renderScanner ? <BarcodeScannerConnected /> : null}
      <Box position="fixed" left={2} bottom={2}>
        <AppStatusIndicator />
      </Box>
    </Box>
  );
};
