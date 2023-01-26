import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Vertical } from "components/Boxes";
import { Box } from "@mui/system";
import { CheckinInfoTileComponent } from "widgets/BhandaraCheckin/types";
import { TextFieldPropsOnChange, TFormControlLabelPropsOnChange } from "types";
import { useCallback, useMemo } from "react";

export const CheckinInfoTile: CheckinInfoTileComponent = ({
  checked,
  fullName,
  dormPreference,
  berthPreference,
  onCheck,
  onChangeDormAllocation,
  abhyasiId,
  registrationId,
}) => {
  const handleChangeCheckinStatus = useCallback<TFormControlLabelPropsOnChange>(
    (_evt, checked) => onCheck(registrationId, checked),
    [registrationId, onCheck]
  );

  const handleChangeDormAllocation = useCallback<TextFieldPropsOnChange>(
    (evt) => {
      onChangeDormAllocation(registrationId, evt.target.value);
    },
    [registrationId, onChangeDormAllocation]
  );

  const showPreference = useMemo(() => {
    return Boolean(dormPreference) && Boolean(berthPreference);
  }, [berthPreference, dormPreference]);

  return (
    <Card>
      <CardContent>
        <Vertical gap={1}>
          <FormControlLabel
            control={
              <Checkbox
                checked={checked}
                onChange={handleChangeCheckinStatus}
              />
            }
            label={fullName}
          />
          <Box>
            {abhyasiId ? (
              <Typography variant="body2" color="text.secondary">
                <strong>Abhyasi Id:&nbsp;</strong>
                {abhyasiId}
              </Typography>
            ) : null}
            <Typography variant="body2" color="text.secondary">
              <strong>Reg Id:&nbsp;</strong>
              {registrationId}&nbsp;&nbsp;
            </Typography>
          </Box>
          {showPreference ? (
            <Box>
              <Typography variant="body2" color="text.secondary">
                <strong>Dorm Preference:</strong>
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {dormPreference}, {berthPreference}
              </Typography>
            </Box>
          ) : null}
          <Box width="100%">
            <Typography variant="body2" color="text.secondary">
              <strong>Dorm Allocation:</strong>
            </Typography>
            <TextField
              variant="outlined"
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
