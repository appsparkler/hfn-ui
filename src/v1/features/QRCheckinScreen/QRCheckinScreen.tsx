import Typography from "@mui/material/Typography/Typography";
import { CardWithClickableHeader } from "./CardWithClickableHeader";
import { ScreenWrapper } from "../components/ScreenWrapper/ScreenWrapper";
import { TextField } from "@mui/material";
import { isEmpty } from "lodash/fp";
import { Horizontal, Vertical } from "components";
import { ContainedButton } from "../components/buttons/ContainedButton/ContainedButton";
import { OutlinedButton } from "../components/buttons/OutlinedButton/OutlinedButton";
import { IQRCheckinCardState } from "../../model/interfaces/IQRCheckinCardState";

const FieldValue: React.FC<{
  name: string;
  value: string;
}> = ({ name, value }) => {
  if (isEmpty(value)) return null;
  return (
    <Typography variant="body2" color="text.secondary">
      <strong>{name}:&nbsp;</strong>
      {value}
    </Typography>
  );
};
const QRCheckinCard: React.FC<{
  state: IQRCheckinCardState;
  onChange: (updatedState: IQRCheckinCardState) => void;
}> = ({ state, onChange }) => {
  const handleClickHeader = () => {
    onChange({
      ...state,
      isSelected: !state.isSelected,
    });
  };
  const handleChangeDormAndBertAllocation: React.ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (evt) => {
    onChange({
      ...state,
      dormAndBerthAllocation: evt.target.value,
    });
  };

  return (
    <CardWithClickableHeader
      onClickHeader={handleClickHeader}
      heading={state.fullName}
      isSelected={state.isSelected}
    >
      <FieldValue name="Event Name" value={state.eventName} />
      <FieldValue name="Abhyasi ID" value={state.abhyasiId} />
      <FieldValue name="PNR" value={state.pnr} />
      <FieldValue name="Order ID" value={state.orderId} />
      <FieldValue name="Registration ID" value={state.registrationId} />
      <FieldValue name="Batch" value={state.batch} />
      <FieldValue name="Dorm Preference" value={state.dormPreference} />
      <FieldValue name="Berth Preference" value={state.berthPreference} />
      <TextField
        type="text"
        disabled={!state.isSelected}
        fullWidth
        label="Dorm & Berth Allocation"
        variant="standard"
        sx={{ mt: 1 }}
        onChange={handleChangeDormAndBertAllocation}
      />
    </CardWithClickableHeader>
  );
};

export const QRCheckinScreen: React.FC<{
  checkins: IQRCheckinCardState[];
  isCheckinDisabled: boolean;
  onChange: (updatedState: IQRCheckinCardState) => void;
  onCheckin: () => void;
  onCancel: () => void;
}> = ({ checkins, isCheckinDisabled, onCancel, onCheckin, onChange }) => {
  return (
    <ScreenWrapper>
      <Vertical gap={1}>
        {checkins.map((checkin) => (
          <QRCheckinCard
            key={checkin.registrationId + checkin.dormPreference}
            state={checkin}
            onChange={onChange}
          />
        ))}
        <Horizontal justifyContent={"space-evenly"}>
          <OutlinedButton onClick={onCancel}>cancel</OutlinedButton>
          <ContainedButton disabled={isCheckinDisabled} onClick={onCheckin}>
            checkin
          </ContainedButton>
        </Horizontal>
      </Vertical>
    </ScreenWrapper>
  );
};
