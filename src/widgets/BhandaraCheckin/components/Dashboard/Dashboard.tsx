import { Button, Typography } from "@mui/material";
import {
  AsyncButton,
  CenterOfViewport,
  Horizontal,
  Vertical,
} from "components";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DashboardComponent } from "widgets/BhandaraCheckin/types";

export const Dashboard: DashboardComponent = ({
  totalCheckins,
  onRefresh,
  onMount,
  onClickGoBack,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const asyncHandler = useCallback(
    (fn: () => void) => async () => {
      setIsProcessing(true);
      await fn();
      setIsProcessing(false);
    },
    []
  );

  useEffect(() => {
    asyncHandler(onMount)();
  }, [asyncHandler, onMount]);

  const display = useMemo(
    () => (isProcessing ? "---" : totalCheckins.toLocaleString()),
    [isProcessing, totalCheckins]
  );

  return (
    <CenterOfViewport gap={2}>
      <Vertical alignItems={"center"}>
        <Typography variant="h4">T O T A L</Typography>
        <Typography variant="h2" fontWeight={"bold"} fontFamily="monospace">
          {display}
        </Typography>
      </Vertical>
      <Horizontal gap={2}>
        <Button
          onClick={onClickGoBack}
          variant="outlined"
          color="primary"
          size="large"
        >
          Go Back
        </Button>
        <AsyncButton
          disabled={isProcessing}
          onClick={asyncHandler(onRefresh)}
          isProcessing={isProcessing}
          variant="contained"
          color="primary"
          size="large"
        >
          Refresh
        </AsyncButton>
      </Horizontal>
    </CenterOfViewport>
  );
};
