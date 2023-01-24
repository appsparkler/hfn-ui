import { Button, Typography } from "@mui/material";
import { CenterOfViewport, Horizontal } from "components";
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
    <CenterOfViewport>
      <Typography variant="h3">T O T A L</Typography>
      <Typography
        variant="h1"
        fontWeight={"bold"}
        letterSpacing={3}
        fontFamily="monospace"
      >
        {totalCheckins}
      </Typography>
      {/* Refresh Button */}
      <Horizontal gap={2}>
        <Button
          onClick={onClickGoBack}
          variant="outlined"
          color="secondary"
          size="large"
        >
          GO BACK
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
