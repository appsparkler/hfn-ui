import Typography from "@mui/material/Typography";
import { FC } from "react";
import PersonPinCircleIcon from "@mui/icons-material/PersonPinCircle";
import Box from "@mui/material/Box";

export type EventNameAndLocationProps = {
  eventName: string;
  eventLocation: string;
};

export const EventNameAndLocation: FC<EventNameAndLocationProps> = ({
  eventName,
  eventLocation,
}) => {
  return (
    <Box marginBottom={5}>
      <Typography variant="h4" mt={2} align="center">
        {eventName}
      </Typography>
      <Typography variant="h5" color="InactiveCaptionText" align="center">
        <PersonPinCircleIcon />
        {eventLocation}
      </Typography>
    </Box>
  );
};
