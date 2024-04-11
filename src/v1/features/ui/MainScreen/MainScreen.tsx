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
import { useCallback, useRef } from "react";

export const UserInfoCard: React.FC<{
  eventTitle: string;
  value: string;
  isCheckinDisabled: boolean;
  onClickCheckin: () => void;
  onChange: (updatedValue: string) => void;
}> = ({
  isCheckinDisabled: isCheckinEnabled,
  eventTitle,
  onChange,
  onClickCheckin,
}) => {
  const inputRef: React.RefObject<HTMLInputElement> = useRef(null);
  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (evt) => {
      onChange(evt.target.value);
    },
    [onChange]
  );

  const handleClickClose = () => {
    if (inputRef.current) {
      inputRef.current.value = "";
      inputRef.current.focus();
    }
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
            inputRef={inputRef}
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
              disabled={isCheckinEnabled}
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
  isCheckinDisabled: boolean;
  onChangeValue: (updatedValue: string) => void;
  onClickScan: () => void;
  onClickCheckin: () => void;
}> = ({
  value,
  eventTitle,
  onClickScan,
  onClickCheckin,
  onChangeValue,
  isCheckinDisabled,
}) => {
  return (
    <Vertical p={2} sx={{ maxWidth: 400 }} mr="auto" ml="auto">
      <UserInfoCard
        eventTitle={eventTitle}
        value={value}
        onChange={onChangeValue}
        onClickCheckin={onClickCheckin}
        isCheckinDisabled={isCheckinDisabled}
      />
      <ScanButton onClick={onClickScan} />
    </Vertical>
  );
};
