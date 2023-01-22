import { Typography } from "@mui/material";
import { CenterOfViewport } from "components";
import React from "react";
import { DashboardComponent } from "widgets/BhandaraCheckin/types";

export const Dashboard: DashboardComponent = ({ totalCheckins }) => {
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
    </CenterOfViewport>
  );
};
