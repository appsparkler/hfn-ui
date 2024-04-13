import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { ageGroupOptions } from "v1/model/data";

export const AgeSelectField: React.FC<{
  onChange: (name: string, value: string) => void;
}> = ({ onChange }) => {
  const handleChange: (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => void = (evt) => {
    onChange("age", evt.target.value);
  };
  return (
    <FormControl variant="standard" sx={{ flex: 1 }}>
      <InputLabel id="age-selection">Age</InputLabel>
      <Select<string>
        name="ageGroup"
        labelId="age-selection"
        onChange={handleChange}
        defaultValue=""
      >
        {ageGroupOptions.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
