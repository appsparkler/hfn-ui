import { Button, Typography } from "@mui/material";
import { CenterOfViewport, Horizontal } from "components";
import { noop } from "lodash";
import { maxWidth } from "widgets/BhandaraCheckin/constants";
import { RefreshAppProps } from "widgets/BhandaraCheckin/types";

export const RefreshApp = ({
  onRefresh = noop,
  onCancel = noop,
}: RefreshAppProps) => {
  return (
    <CenterOfViewport maxWidth={maxWidth} gap={2}>
      <Typography variant="h5" align="center">
        Please ensure that you have a stable internet connection before you
        click on REFRESH. Clicking on it without internet will remove the
        current offline version of the app without installing the latest one.
      </Typography>
      <Horizontal gap={1}>
        <Button type="button" variant="outlined" onClick={onRefresh}>
          Refresh
        </Button>
        <Button type="button" variant="contained" onClick={onCancel}>
          Cancel
        </Button>
      </Horizontal>
    </CenterOfViewport>
  );
};
