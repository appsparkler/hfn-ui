import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { FC, MouseEventHandler } from "react";

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
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Typography variant="h3">Kanha Shanti Vanam</Typography>
      <Typography variant="h5" color="InfoText">
        Youth Seminar
      </Typography>
      <Button variant="contained" type="button" onClick={onClickCheckIn}>
        Check In
      </Button>
      <Button
        variant="contained"
        type="button"
        onClick={onClickHelpOthersCheckIn}
      >
        Help Others Check In
      </Button>
    </Box>
  );
};
