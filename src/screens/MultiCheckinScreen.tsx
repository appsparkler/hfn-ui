import { Box, Button, Typography } from "@mui/material";
import { Horizontal, Vertical } from "components";
import { CheckinInfoTiles } from "components/CheckinInfoTile";

export const MultiCheckinScreen = () => {
  return (
    <Vertical sx={{ display: "flex", height: "100vh" }}>
      <Box>
        <Typography align="center" variant="h6" py="2">
          Checkin with Dorm/Bed Allocation
        </Typography>
      </Box>
      <Box sx={{ flex: 1, overflow: "auto" }}>
        <CheckinInfoTiles />
      </Box>
      <Horizontal sx={{ justifyContent: "space-around", padding: 2 }}>
        <Button size="large">Cancel</Button>
        <Button size="large" variant="contained">
          Checkin
        </Button>
      </Horizontal>
    </Vertical>
  );
};
