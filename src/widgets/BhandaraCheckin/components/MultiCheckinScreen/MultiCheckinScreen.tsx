import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Horizontal, Vertical } from "components";
import { CheckinInfoTiles } from "./CheckinInfoTile";
import { TMultiCheckinScreenComponent } from "widgets/BhandaraCheckin/types";
import { maxWidth } from "widgets/BhandaraCheckin/constants";

export const MultiCheckinScreen: TMultiCheckinScreenComponent = ({
  userData,
  eventInfo: { eventId, eventName, pnr },
  onClickCheckin,
  onClickCancel,
  onChangeData,
}) => {
  return (
    <Vertical
      sx={{
        display: "flex",
        maxWidth,
        marginX: "auto",
      }}
    >
      <Box
        boxShadow="0px 2px 5px black"
        zIndex={2000}
        position="sticky"
        top={0}
        p={1}
        sx={{ backgroundColor: "background.paper" }}
      >
        <Typography align="center" variant="h6" py="2">
          QR Code Checkin
        </Typography>
      </Box>
      <Box sx={{ flex: 1, overflow: "auto", py: 2 }}>
        <Box m={2}>
          <Card elevation={1}>
            <CardContent>
              <Typography variant="h5" align="center">
                {eventName}
              </Typography>
              <Typography variant="h6" align="center">
                PNR: {pnr}
              </Typography>
            </CardContent>
          </Card>
        </Box>
        <CheckinInfoTiles data={userData} onChange={onChangeData} />
      </Box>
      <Horizontal
        sx={{
          justifyContent: "space-around",
          padding: 2,
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
