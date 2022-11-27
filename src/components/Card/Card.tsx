import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import {
  Button,
  CardActionArea,
  CardActions,
  Checkbox,
  FormControlLabel,
  Input,
  TextField,
} from "@mui/material";
import { Horizontal, Vertical } from "components/Boxes";
import { Box } from "@mui/system";

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
  ].map((tileData) => <MultiActionAreaCard key={tileData.id} {...tileData} />);
}

export const MultiActionAreaCard: React.FC<{
  fullName: string;
  id: string;
  dormPreference: string;
  birthPreference: string;
}> = ({ fullName, dormPreference, birthPreference }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Vertical gap={1}>
          <FormControlLabel
            control={
              <Checkbox checked={true} onChange={() => {}} name="jason" />
            }
            label={fullName}
          />
          <Box>
            <Typography variant="subtitle2">Dorm Preference</Typography>
            <Typography variant="body2" color="text.secondary">
              {dormPreference}, {birthPreference}
            </Typography>
          </Box>
          <Box width="100%">
            <Typography variant="subtitle2">Dorm Allocation</Typography>
            <TextField
              variant="outlined"
              placeholder="Please enter allocated dorm and birth..."
              fullWidth
            />
          </Box>
        </Vertical>
      </CardContent>
    </Card>
  );
};
