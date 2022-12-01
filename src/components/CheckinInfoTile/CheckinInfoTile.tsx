import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Vertical } from "components/Boxes";
import { Box } from "@mui/system";
import {
  CheckinInfoTileComponent,
  TextFieldPropsOnChange,
  TFormControlLabelPropsOnChange,
} from "types";
import { useCallback } from "react";

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
            <Typography variant="subtitle2">Dorm Preference:</Typography>
            <Typography variant="body2" color="text.secondary">
              {dormPreference}, {birthPreference}
            </Typography>
          </Box>
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
