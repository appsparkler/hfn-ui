import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { FC, MouseEventHandler, useCallback } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { EventNameAndLocation } from "../EventNameAndLocation";

export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

export type SignedInUserCheckInProps = {
  onClickCheckIn: ClickHandler;
  onClickHelpOthersCheckIn: ClickHandler;
};

export const SignedInUserCheckIn: FC<SignedInUserCheckInProps> = ({
  onClickCheckIn,
  onClickHelpOthersCheckIn,
}) => {
  const onClickBackButton = useCallback<ClickHandler>(() => {
    alert("lets go back");
  }, []);
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
            onClick={onClickBackButton}
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
        <EventNameAndLocation
          eventName="Youth Seminar"
          eventLocation="Kanha Shanti Vanam"
        />
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
