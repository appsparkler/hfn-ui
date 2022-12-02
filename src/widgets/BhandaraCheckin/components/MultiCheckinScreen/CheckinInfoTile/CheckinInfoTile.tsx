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
  birthPreference,
  onCheck,
  onChangeDormAllocation,
  id,
}) => {
  const handleChangeCheckinStatus = useCallback<TFormControlLabelPropsOnChange>(
    (_evt, checked) => onCheck(id, checked),
    [id, onCheck]
  );

  const handleChangeDormAllocation = useCallback<TextFieldPropsOnChange>(
    (evt) => {
      onChangeDormAllocation(id, evt.target.value);
    },
    [id, onChangeDormAllocation]
  );

  const showPreference = useMemo(() => {
    return Boolean(dormPreference) && Boolean(birthPreference);
  }, [birthPreference, dormPreference]);

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
          {showPreference ? (
            <Box>
              <Typography variant="subtitle2">Dorm Preference:</Typography>
              <Typography variant="body2" color="text.secondary">
                {dormPreference}, {birthPreference}
              </Typography>
            </Box>
          ) : null}
          <Box width="100%">
            <Typography variant="subtitle2">Dorm Allocation:</Typography>
            <TextField
              variant="outlined"
              placeholder="Please enter allocated dorm and birth..."
              fullWidth
              onChange={handleChangeDormAllocation}
            />
          </Box>
        </Vertical>
      </CardContent>
    </Card>
  );
};
