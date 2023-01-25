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
  onClickGoBack,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleRefresh = useCallback(async () => {
    setIsProcessing(true);
    await onRefresh();
    setIsProcessing(false);
  }, [onRefresh]);

  useEffect(() => {
    setIsProcessing(true);
    handleRefresh().then(() => {
      setIsProcessing(false);
    });
  }, [handleRefresh]);

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
          onClick={handleRefresh}
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
