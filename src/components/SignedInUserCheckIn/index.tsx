import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, MouseEventHandler } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

export type SignedInUserCheckInProps = {
  onClickCheckIn: ClickHandler;
  onClickHelpOthersCheckIn: ClickHandler;
};

export const SignedInUserCheckIn: FC<SignedInUserCheckInProps> = ({
  onClickCheckIn,
  onClickHelpOthersCheckIn,
}) => {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <ArrowBackIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Kanha Shanti Vanam</Typography>
        <Typography variant="h5" color="InfoText">
          Youth Seminar
        </Typography>
        <Button variant="contained" type="button" onClick={onClickCheckIn}>
          Check In
        </Button>
        <Button
          variant="outlined"
          type="button"
          onClick={onClickHelpOthersCheckIn}
        >
          Help Others Check In
        </Button>
      </Box>
    </>
  );
};
