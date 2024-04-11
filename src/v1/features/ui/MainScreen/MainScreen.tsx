import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Fab,
  TextField,
  Typography,
} from "@mui/material";
import { Horizontal, Vertical } from "components/Boxes";
import { useCallback } from "react";

export const UserInfoCard: React.FC<{
  value: string;
  onClickCheckin: () => void;
  onClickPlusNineOne: () => void;
  onChange: (updatedValue: string) => void;
}> = ({ value, onChange, onClickCheckin, onClickPlusNineOne }) => {
  const handleChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = useCallback(
    (evt) => {
      onChange(evt.target.value);
    },
    [onChange]
  );

  return (
    <Card elevation={1}>
      <CardMedia>
        <Typography
          p={2}
          bgcolor={"primary.main"}
          color="primary.contrastText"
          variant="h5"
        >
          Bhandara
        </Typography>
      </CardMedia>
      <CardContent>
        <Vertical gap={1}>
          <TextField
            label="Abhyasi ID / Email / Mobile #"
            fullWidth
            variant="standard"
            helperText="Please ensure mobile number begins with country code.  For ex. +9138383...."
            onChange={handleChange}
            defaultValue={""}
          />
          <Horizontal gap={1}>
            <Button
              type="button"
              variant="outlined"
              size="large"
              onClick={onClickPlusNineOne}
            >
              +91
            </Button>
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
  onChangeValue: (updatedValue: string) => void;
  onClickScan: () => void;
  onClickCheckin: () => void;
  onClickPlusNineOne: () => void;
}> = ({
  value,
  onClickScan,
  onClickCheckin,
  onClickPlusNineOne,
  onChangeValue,
}) => {
  return (
    <Vertical p={2} sx={{ maxWidth: 400 }} mr="auto" ml="auto">
      <UserInfoCard
        value={value}
        onChange={onChangeValue}
        onClickCheckin={onClickCheckin}
        onClickPlusNineOne={onClickPlusNineOne}
      />
      <ScanButton onClick={onClickScan} />
    </Vertical>
  );
};
