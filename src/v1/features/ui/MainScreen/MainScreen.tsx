import {
  Button,
  Card,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { Horizontal, Vertical } from "components/Boxes";

export const UserInfoCard = () => {
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
            <Button type="button" variant="outlined" size="large">
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
            >
              Checkin
            </Button>
          </Horizontal>
        </Vertical>
      </CardContent>
    </Card>
  );
};

export const MainScreen = () => {
  return (
    <Vertical p={2} sx={{ maxWidth: 400 }} mr="auto" ml="auto">
      <UserInfoCard />
    </Vertical>
  );
};
