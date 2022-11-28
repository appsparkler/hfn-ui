import { Box, Button, Typography } from "@mui/material";
import { Horizontal, Vertical } from "components";
import { CheckinInfoTiles } from "components/CheckinInfoTile";

export interface MultiCheckinScreenStateProps {}

export interface MultiCheckinScreenDispatchProps {
  onClickCheckin: () => void;
  onClickCancel: () => void;
}

export type MultiCheckinScreenProps = MultiCheckinScreenStateProps &
  MultiCheckinScreenDispatchProps;

export const MultiCheckinScreen: React.FC<MultiCheckinScreenProps> = ({
  onClickCheckin,
  onClickCancel,
}) => {
  return (
    <Vertical sx={{ display: "flex", height: "100vh" }}>
      <Box boxShadow="2px 2px 5px black" zIndex={2000}>
        <Typography align="center" variant="h6" py="2">
          Checkin with Dorm/Bed Allocation
        </Typography>
      </Box>
      <Box sx={{ flex: 1, overflow: "auto", py: 2 }}>
        <CheckinInfoTiles />
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
