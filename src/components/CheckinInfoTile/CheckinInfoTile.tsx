import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Checkbox, FormControlLabel, TextField } from "@mui/material";
import { Vertical } from "components/Boxes";
import { Box } from "@mui/system";
import { CheckinInfoTileProps } from "types";

export const CheckinInfoTile: CheckinInfoTileProps = ({
  fullName,
  dormPreference,
  birthPreference,
  onCheck,
  onChangeDormAllocation,
}) => {
  return (
    <Card>
      <CardContent>
        <Vertical gap={1}>
          <FormControlLabel
            control={<Checkbox checked={true} onChange={onCheck} />}
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
              onChange={onChangeDormAllocation}
            />
          </Box>
        </Vertical>
      </CardContent>
    </Card>
  );
};
