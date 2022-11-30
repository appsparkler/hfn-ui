import { Box, Button, Typography } from "@mui/material";
import { Horizontal, Vertical } from "components";
import { CheckinInfoTiles } from "components/CheckinInfoTile";
import { TMultiCheckinScreenComponent } from "types";

export const MultiCheckinScreen: TMultiCheckinScreenComponent = ({
  data,
  onClickCheckin,
  onClickCancel,
  onChangeData,
}) => {
  return (
    <Vertical sx={{ display: "flex", height: "100vh" }}>
      <Box boxShadow="2px 2px 5px black" zIndex={2000}>
        <Typography align="center" variant="h6" py="2">
          Checkin with Dorm/Bed Allocation
        </Typography>
      </Box>
      <Box sx={{ flex: 1, overflow: "auto", py: 2 }}>
        <CheckinInfoTiles data={data} onChange={onChangeData} />
      </Box>
      <Horizontal
        sx={{
          justifyContent: "space-around",
          padding: 2,
          boxShadow: "-2px -2px 5px black ",
        }}
      >
        <Button onClick={onClickCancel} size="large">
          Cancel
        </Button>
        <Button onClick={onClickCheckin} size="large" variant="contained">
          Checkin
        </Button>
      </Horizontal>
    </Vertical>
  );
};
