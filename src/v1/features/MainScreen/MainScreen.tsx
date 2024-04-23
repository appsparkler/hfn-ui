import { Close } from "@mui/icons-material";
import {
  Fab,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { Horizontal, Vertical } from "components/Boxes";
import { useCallback, useRef } from "react";
import { CardWithHeader } from "../components/CardWithHeader/CardWithHeader";
import { BatchSelectField } from "../components/BatchSelectField/BatchSelectField";
import { ContainedButton } from "../components/buttons/ContainedButton/ContainedButton";
import { ScreenWrapper } from "../components/ScreenWrapper/ScreenWrapper";

export interface IMainScreenStateProps {
  eventTitle: string;
  defaultBatchValue: string;
  value: string;
  isCheckinDisabled: boolean;
}

export interface IMainScreenActionProps {
  onChangeBatch: (name: string, selectedBatch: string) => void;
  onClickCheckin: () => void;
  onChange: (updatedValue: string) => void;
}

const UserInfoCard: React.FC<IMainScreenStateProps & IMainScreenActionProps> =
  ({
    isCheckinDisabled,
    defaultBatchValue,
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
        onChange("");
      }
    };

    return (
      <CardWithHeader heading={eventTitle}>
        <Vertical gap={1}>
          <BatchSelectField
            defaultValue={defaultBatchValue}
            onChange={onChangeBatch}
          />
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
          <Horizontal gap={1} justifyContent={"center"}>
            <ContainedButton
              disabled={isCheckinDisabled}
              onClick={onClickCheckin}
            >
              Checkin
            </ContainedButton>
          </Horizontal>
        </Vertical>
      </CardWithHeader>
    );
  };

const ScanButton: React.FC<{ disabled: boolean; onClick: () => void }> = ({
  disabled,
  onClick,
}) => {
  return (
    <Fab
      disabled={disabled}
      type="button"
      sx={{ position: "absolute", bottom: 16, right: 16 }}
      color="secondary"
      onClick={onClick}
      size="large"
    >
      SCAN
    </Fab>
  );
};

export const MainScreen: React.FC<{
  value: string;
  isRegisteringDevice: boolean;
  eventTitle: string;
  defaultBatchValue: string;
  isCheckinDisabled: boolean;
  onChangeBatch: (name: string, selectedBatch: string) => void;
  onChangeValue: (updatedValue: string) => void;
  onClickScan: () => void;
  onClickCheckin: () => void;
}> = ({
  isRegisteringDevice,
  value,
  eventTitle,
  defaultBatchValue,
  isCheckinDisabled,
  onClickScan,
  onClickCheckin,
  onChangeBatch,
  onChangeValue,
}) => {
  return (
    <ScreenWrapper alignItems={"center"} justifyContent={"center"} gap={1}>
      <UserInfoCard
        defaultBatchValue={defaultBatchValue}
        eventTitle={eventTitle}
        value={value}
        onChange={onChangeValue}
        onClickCheckin={onClickCheckin}
        isCheckinDisabled={isCheckinDisabled}
        onChangeBatch={onChangeBatch}
      />
      {isRegisteringDevice && (
        <Vertical alignItems={"center"}>
          <LinearProgress sx={{ width: 100 }} />
          <Typography>Setting up</Typography>
        </Vertical>
      )}
      <ScanButton disabled={isRegisteringDevice} onClick={onClickScan} />
    </ScreenWrapper>
  );
};
