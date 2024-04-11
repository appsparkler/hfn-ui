import { Close } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Fab,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Horizontal, Vertical } from "components/Boxes";
import { useCallback } from "react";

export const UserInfoCard: React.FC<{
  eventTitle: string;
  value: string;
  onClickCheckin: () => void;
  onClickPlusNineOne: () => void;
  onChange: (updatedValue: string) => void;
}> = ({ value, eventTitle, onChange, onClickCheckin, onClickPlusNineOne }) => {
  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (evt) => {
      onChange(evt.target.value);
    },
    [onChange]
  );

  const handleClickClose = () => {
    onChange("");
  };

  return (
    <Card elevation={1}>
      <CardMedia>
        <Typography
          p={2}
          bgcolor={"primary.main"}
          color="primary.contrastText"
          variant="h5"
        >
          {eventTitle}
        </Typography>
      </CardMedia>
      <CardContent>
        <Vertical gap={1}>
          <TextField
            label="Abhyasi ID / Email / Mobile #"
            fullWidth
            variant="standard"
            InputProps={{
              endAdornment: (
                <IconButton type="button" onClick={handleClickClose}>
                  <Close />
                </IconButton>
              ),
            }}
            helperText="Please ensure mobile number begins with country code.  For ex. +9138383...."
            onChange={handleChange}
            defaultValue={"+91"}
          />
          <Horizontal gap={1}>
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
  value: string;
  eventTitle: string;
  onChangeValue: (updatedValue: string) => void;
  onClickScan: () => void;
  onClickCheckin: () => void;
  onClickPlusNineOne: () => void;
}> = ({
  value,
  eventTitle,
  onClickScan,
  onClickCheckin,
  onClickPlusNineOne,
  onChangeValue,
}) => {
  return (
    <Vertical p={2} sx={{ maxWidth: 400 }} mr="auto" ml="auto">
      <UserInfoCard
        eventTitle={eventTitle}
        value={value}
        onChange={onChangeValue}
        onClickCheckin={onClickCheckin}
        onClickPlusNineOne={onClickPlusNineOne}
      />
      <ScanButton onClick={onClickScan} />
    </Vertical>
  );
};
