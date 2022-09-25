import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import { CenterOfViewport, Vertical } from "components";
import { Typography } from "@mui/material";

export function AppUpdater({ progressText }: { progressText?: string }) {
  return (
    <CenterOfViewport>
      <Vertical alignItems={"center"} gap={2}>
        <CircularProgress />
        <Typography variant="body2">{progressText}</Typography>
      </Vertical>
    </CenterOfViewport>
  );
}
