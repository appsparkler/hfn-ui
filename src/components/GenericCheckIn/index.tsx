import Box from "@mui/material/Box";
import { FC, MouseEventHandler, useCallback } from "react";
import {
  EventNameAndLocation,
  EventNameAndLocationProps,
} from "../EventNameAndLocation";
import { AppBar, AppBarProps } from "../SignedInUserCheckIn";

export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

export type GenericCheckInProps = EventNameAndLocationProps & {};

export const GenericCheckIn: FC<GenericCheckInProps> = ({
  eventLocation,
  eventName,
}) => {
  const onClickBackButton = useCallback<
    AppBarProps["onClickBackButton"]
  >(() => {
    alert("lets go back");
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <AppBar onClickBackButton={onClickBackButton} />
      <EventNameAndLocation
        eventLocation={eventLocation}
        eventName={eventName}
      />
    </Box>
  );
};
