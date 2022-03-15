import Typography from "@mui/material/Typography";
import { FC } from "react";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";

export type EventNameAndLocationProps = {
  eventName: string;
  eventLocation: string;
};

export const EventNameAndLocation: FC<EventNameAndLocationProps> = ({
  eventName,
  eventLocation,
}) => {
  return (
    <>
      <Typography variant="h4" mt={2}>
        {eventName}
      </Typography>
      <Typography variant="h5" color="InactiveCaptionText">
        <PersonPinCircleIcon />
        {eventLocation}
      </Typography>
    </>
  );
};
