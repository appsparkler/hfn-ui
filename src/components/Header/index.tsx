import { FC } from "react";
import MUIAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {
  EventNameAndLocation,
  EventNameAndLocationProps,
} from "../EventNameAndLocation";
import { ClickHandler } from "../GenericCheckInVerbose";

export type AppBarProps = {
  onClickBackButton: ClickHandler;
} & EventNameAndLocationProps;

export const AppBar: FC<AppBarProps> = ({
  onClickBackButton,
  eventLocation,
  eventName,
}) => (
  <>
    <MUIAppBar position="static">
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
    </MUIAppBar>
    <EventNameAndLocation eventName={eventName} eventLocation={eventLocation} />
  </>
);
