import { Button, Card, CardContent, Typography } from "@mui/material";
import { Horizontal, Vertical } from "components";
import { CheckinInfoTiles } from "./CheckinInfoTile";
import { TMultiCheckinScreenComponent } from "widgets/BhandaraCheckin/types";
import { maxWidth } from "widgets/BhandaraCheckin/constants";
import { QrCode2 } from "@mui/icons-material";

export const MultiCheckinScreen: TMultiCheckinScreenComponent = ({
  userData,
  more,
  eventInfo: { eventName, pnr },
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
      gap={2}
    >
      <Card>
        <CardContent>
          <Typography variant="h4" color="goldenrod" align="center">
            <QrCode2 fontSize={"large"} />
            <br />
            {eventName}
            <br />
            {pnr}
          </Typography>
        </CardContent>
      </Card>
      <CheckinInfoTiles data={userData} onChange={onChangeData} />

      {more && (
        <Card>
          <CardContent>
            <Typography variant="body1" textAlign={"center"}>
              + {more}(please checkin separately)
            </Typography>
          </CardContent>
        </Card>
      )}

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
