import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Vertical } from "components/Boxes";
import { Box } from "@mui/system";
import { CheckinInfoTileComponent } from "widgets/BhandaraCheckin/types";
import { TextFieldPropsOnChange, TFormControlLabelPropsOnChange } from "types";
import { useCallback } from "react";

export const CheckinInfoTile: CheckinInfoTileComponent = ({
  abhyasiId,
  batch,
  berthPreference,
  checkin,
  dormAndBerthAllocation,
  dormPreference,
  eventName,
  fullName,
  orderId,
  pnr,
  regId,
  onCheck,
  onChangeDormAllocation,
}) => {
  const handleChangeCheckinStatus = useCallback<TFormControlLabelPropsOnChange>(
    (_evt, checked) => onCheck(regId, checked),
    [regId, onCheck]
  );

  const handleChangeDormAllocation = useCallback<TextFieldPropsOnChange>(
    (evt) => {
      onChangeDormAllocation(regId, evt.target.value);
    },
    [regId, onChangeDormAllocation]
  );

  // const showPreference = useMemo(() => {
  //   return Boolean(dormPreference) && Boolean(berthPreference);
  // }, [berthPreference, dormPreference]);

  return (
    <Card>
      <CardContent>
        <Vertical gap={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checkin}
                onChange={handleChangeCheckinStatus}
              />
            }
            label={fullName}
          />
          <Box>
            <Typography variant="body2" color="text.secondary">
              <strong>Event Name:&nbsp;</strong>
              {eventName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Order ID:&nbsp;</strong>
              {orderId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>PNR:&nbsp;</strong>
              {pnr}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Registration ID:&nbsp;</strong>
              {regId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Abhyasi Id:&nbsp;</strong>
              {abhyasiId}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              <strong>Batch:&nbsp;</strong>
              {batch}
            </Typography>
            {dormPreference && (
              <Typography variant="body2" color="text.secondary">
                <strong>Dorm Preference:&nbsp;</strong>
                {dormPreference}
              </Typography>
            )}
            {berthPreference && (
              <Typography variant="body2" color="text.secondary">
                <strong>Berth Preference:&nbsp;</strong>
                {berthPreference}
              </Typography>
            )}
          </Box>
          <Box width="100%">
            <Typography variant="body2" color="text.secondary">
              <strong>Dorm Allocation:</strong>
            </Typography>
            <TextField
              variant="outlined"
              defaultValue={dormAndBerthAllocation}
              placeholder="Please enter allocated dorm and berth..."
              fullWidth
              onChange={handleChangeDormAllocation}
            />
          </Box>
        </Vertical>
      </CardContent>
    </Card>
  );
};
