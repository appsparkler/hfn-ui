import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ageGroupOptions } from "v1/model/data";

export const AgeSelectField: React.FC<{
  onChange: (value: string) => void;
}> = ({ onChange }) => {
  const handleChange: (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => void = (evt) => {
    onChange(evt.target.value);
  };
  return (
    <FormControl variant="standard">
      <InputLabel id="age-selection">Age</InputLabel>
      <Select<string> labelId="age-selection" onChange={handleChange}>
        {ageGroupOptions.map(({ value, label }) => (
          <MenuItem key={value} value={label}>
            {value}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
