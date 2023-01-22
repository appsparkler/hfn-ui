import { Typography } from "@mui/material";
import { AsyncButton, CenterOfViewport } from "components";
import { useEffect } from "react";
import { DashboardComponent } from "widgets/BhandaraCheckin/types";

export const Dashboard: DashboardComponent = ({
  totalCheckins,
  onMount,
  onClickRefresh,
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
      <AsyncButton
        onClick={onClickRefresh}
        variant="contained"
        color="primary"
        size="large"
        sx={{ mt: 2 }}
      >
        Refresh
      </AsyncButton>
    </CenterOfViewport>
  );
};
