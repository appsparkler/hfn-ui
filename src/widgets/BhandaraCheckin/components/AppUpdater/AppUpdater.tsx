import * as React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import WarningIcon from "@mui/icons-material/Warning";
import CircularProgress from "@mui/material/CircularProgress";
import { CenterOfViewport, Vertical } from "components";
import { Typography } from "@mui/material";
import { AppUpdaterProps } from "widgets/BhandaraCheckin/types";

export function AppUpdater({
  progressText,
  success = false,
  inProgress = true,
  warning = false,
}: AppUpdaterProps) {
  return (
    <CenterOfViewport>
      <Vertical alignItems={"center"} gap={2}>
        {inProgress && <CircularProgress />}
        {success && <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />}
        {warning && <WarningIcon color="warning" sx={{ fontSize: 80 }} />}
        <Typography variant="body2">{progressText}</Typography>
      </Vertical>
    </CenterOfViewport>
  );
}
