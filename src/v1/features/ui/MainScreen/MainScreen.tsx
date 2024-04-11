import { Close } from "@mui/icons-material";
import { Fab, IconButton, TextField } from "@mui/material";
import { Horizontal, Vertical } from "components/Boxes";
import { useCallback, useRef } from "react";
import { CardWithHeader } from "../components/CardWithHeader/CardWithHeader";
import { BatchSelectField } from "../components/BatchSelectField/BatchSelectField";
import { ContainedButton } from "../components/buttons/ContainedButton/ContainedButton";
import { ScreenWrapper } from "../components/ScreenWrapper/ScreenWrapper";

const UserInfoCard: React.FC<{
  eventTitle: string;
  defaultBatchValue: string;
  value: string;
  onChangeBatch: (selectedBatch: string) => void;
  isCheckinDisabled: boolean;
  onClickCheckin: () => void;
  onChange: (updatedValue: string) => void;
}> = ({
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
          <ContainedButton disabled={isCheckinDisabled}>
            Checkin
          </ContainedButton>
        </Horizontal>
      </Vertical>
    </CardWithHeader>
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
  defaultBatchValue: string;
  isCheckinDisabled: boolean;
  onChangeBatch: (selectedBatch: string) => void;
  onChangeValue: (updatedValue: string) => void;
  onClickScan: () => void;
  onClickCheckin: () => void;
}> = ({
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
    <ScreenWrapper>
      <UserInfoCard
        defaultBatchValue={defaultBatchValue}
        eventTitle={eventTitle}
        value={value}
        onChange={onChangeValue}
        onClickCheckin={onClickCheckin}
        isCheckinDisabled={isCheckinDisabled}
        onChangeBatch={onChangeBatch}
      />
      <ScanButton onClick={onClickScan} />
    </ScreenWrapper>
  );
};
