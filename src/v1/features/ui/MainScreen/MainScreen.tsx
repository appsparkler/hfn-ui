import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Fab,
  TextField,
  Typography,
} from "@mui/material";
import { Horizontal, Vertical } from "components/Boxes";

export const UserInfoCard: React.FC<{
  onClickCheckin: () => void;
  onClickPlusNineOne: () => void;
}> = ({ onClickCheckin, onClickPlusNineOne }) => {
  return (
    <Card elevation={1}>
      <CardMedia>
        <Typography
          p={2}
          bgcolor={"primary.main"}
          color="primary.contrastText"
          variant="h5"
        >
          Bhandara
        </Typography>
      </CardMedia>
      <CardContent>
        <Vertical gap={1}>
          <TextField
            label="Abhyasi ID / Email / Mobile #"
            fullWidth
            variant="standard"
            helperText="Please ensure mobile number begins with country code.  For ex. +9138383...."
          />
          <Horizontal gap={1}>
            <Button
              type="button"
              variant="outlined"
              size="large"
              onClick={onClickPlusNineOne}
            >
              +91
            </Button>
            <Button
              disableElevation
              sx={{
                display: "flex",
                flexBasis: "100%",
              }}
              type="button"
              variant="contained"
              size={"large"}
              onClick={onClickCheckin}
            >
              Checkin
            </Button>
          </Horizontal>
        </Vertical>
      </CardContent>
    </Card>
  );
};

const ScanButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Fab
      type="button"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      color="secondary"
      onClick={onClick}
    >
      SCAN
    </Fab>
  );
};

export const MainScreen: React.FC<{
  onClickScan: () => void;
  onClickCheckin: () => void;
  onClickPlusNineOne: () => void;
}> = ({ onClickScan, onClickCheckin, onClickPlusNineOne }) => {
  return (
    <Vertical p={2} sx={{ maxWidth: 400 }} mr="auto" ml="auto">
      <UserInfoCard
        onClickCheckin={onClickCheckin}
        onClickPlusNineOne={onClickPlusNineOne}
      />
      <ScanButton onClick={onClickScan} />
    </Vertical>
  );
};
