import Typography from "@mui/material/Typography/Typography";
import { CardWithClickableHeader } from "../components/CardWithHeader/CardWithHeader";
import { ScreenWrapper } from "../components/ScreenWrapper/ScreenWrapper";
import { TextField } from "@mui/material";
import { isEmpty } from "lodash/fp";
import { Vertical } from "components";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

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
interface IQRCheckinCardState {
  fullName: string;
  eventName: string;
  abhyasiId: string;
  pnr: string;
  registrationId: string;
  batch: string;
  // dorm and berth
  dormPreference: string;
  berthPreference: string;
  dormAndBerthAllocation: string;
  isSelected: boolean;
}
const QRCheckinCard: React.FC<{
  state: IQRCheckinCardState;
}> = ({ state }) => {
  return (
    <CardWithClickableHeader
      onClickHeader={() => {}}
      heading={state.fullName}
      isSelected={state.isSelected}
    >
      <FieldValue name="Event Name" value={state.eventName} />
      <FieldValue name="Abhyasi ID" value={state.abhyasiId} />
      <FieldValue name="PNR" value={state.pnr} />
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
      />
    </CardWithClickableHeader>
  );
};

export const QRCheckinScreen: React.FC<{
  checkins: IQRCheckinCardState[];
}> = ({ checkins }) => {
  return (
    <ScreenWrapper>
      <Vertical gap={1}>
        {checkins.map((checkin) => (
          <QRCheckinCard state={checkin} />
        ))}
      </Vertical>
    </ScreenWrapper>
  );
};
