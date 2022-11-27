import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {
  Checkbox,
  FormControlLabel,
  FormControlLabelProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { Vertical } from "components/Boxes";
import { Box } from "@mui/system";
import { noop } from "lodash/fp";

export function Tiles() {
  return [
    {
      id: "tile-1",
      fullName: "Jane Mathew",
      dormPreference: "East Comform Dorm - B1",
      birthPreference: "LB",
    },
    {
      id: "tile-2",
      fullName: "Shekhar Kapoor",
      dormPreference: "German Tent",
      birthPreference: "LB",
    },
  ].map((tileData) => (
    <CheckinInfoTile
      key={tileData.id}
      {...tileData}
      onCheck={noop}
      onChangeDormAllocation={noop}
    />
  ));
}

export const CheckinInfoTile: React.FC<{
  fullName: string;
  id: string;
  dormPreference: string;
  birthPreference: string;
  onCheck: FormControlLabelProps["onChange"];
  onChangeDormAllocation: TextFieldProps["onChange"];
}> = ({
  fullName,
  dormPreference,
  birthPreference,
  onCheck,
  onChangeDormAllocation,
}) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
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
