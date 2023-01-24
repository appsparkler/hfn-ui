import { Button, Typography } from "@mui/material";
import { CenterOfViewport, Horizontal, Vertical } from "components";
import { useEffect } from "react";
import { DashboardComponent } from "widgets/BhandaraCheckin/types";

export const Dashboard: DashboardComponent = ({
  totalCheckins,
  onMount,
  onClickRefresh,
  onClickGoBack,
}) => {
  useEffect(() => {
    onMount();
  }, [onMount]);

  return (
    <CenterOfViewport gap={2}>
      <Vertical alignItems={"center"}>
        <Typography variant="h4">T O T A L</Typography>
        <Typography variant="h2" fontWeight={"bold"} fontFamily="monospace">
          {totalCheckins.toLocaleString()}
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
        <Button
          onClick={onClickRefresh}
          variant="contained"
          color="primary"
          size="large"
        >
          Refresh
        </Button>
      </Horizontal>
    </CenterOfViewport>
  );
};
