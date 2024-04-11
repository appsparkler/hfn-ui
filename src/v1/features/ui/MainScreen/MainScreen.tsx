import { Close } from "@mui/icons-material";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { Horizontal, Vertical } from "components/Boxes";
import { useCallback, useRef } from "react";


const BatchSelectField: React.FC<{
  onChange: (selectedBatch: string) => void;
}> = ({ onChange }) => {
  const handleChange: (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => void = (evt) => {
    const batch = evt.target.value;
    onChange(batch);
  };
  return (
    <FormControl variant="standard">
      <InputLabel id="batch-label">Batch</InputLabel>
      <Select
        labelId="batch-label"
        defaultValue="batch-1"
        onChange={handleChange}
      >
        <MenuItem value="batch-1">batch-1</MenuItem>
        <MenuItem value="batch-2, batch-1">batch-2, batch-1</MenuItem>
      </Select>
    </FormControl>
  );
};

export const UserInfoCard: React.FC<{
  eventTitle: string;
  value: string;
  onChangeBatch: (selectedBatch: string) => void;
  isCheckinDisabled: boolean;
  onClickCheckin: () => void;
  onChange: (updatedValue: string) => void;
}> = ({
  isCheckinDisabled: isCheckinEnabled,
  eventTitle,
  onChangeBatch,
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
          <BatchSelectField onChange={onChangeBatch} />
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
  onChangeBatch: (selectedBatch: string) => void;
  onChangeValue: (updatedValue: string) => void;
  onClickScan: () => void;
  onClickCheckin: () => void;
}> = ({
  value,
  eventTitle,
  isCheckinDisabled,
  onClickScan,
  onClickCheckin,
  onChangeBatch,
  onChangeValue,
}) => {
  return (
    <Vertical p={2} sx={{ maxWidth: 400 }} mr="auto" ml="auto">
      <UserInfoCard
        eventTitle={eventTitle}
        value={value}
        onChange={onChangeValue}
        onClickCheckin={onClickCheckin}
        isCheckinDisabled={isCheckinDisabled}
        onChangeBatch={onChangeBatch}
      />
      <ScanButton onClick={onClickScan} />
    </Vertical>
  );
};
