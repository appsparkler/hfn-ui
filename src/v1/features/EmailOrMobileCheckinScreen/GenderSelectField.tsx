import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { genderOptions } from "v1/model/data";

export const GenderSelectField: React.FC<{
  onChange: (name: string, value: string) => void;
}> = ({ onChange }) => {
  const handleChange: (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => void = (evt) => {
    onChange(evt.target.name, evt.target.value);
  };

  return (
    <FormControl variant="standard" sx={{ flex: 1 }}>
      <InputLabel id="gender-selection">Gender</InputLabel>
      <Select<string>
        name="gender"
        labelId="gender-selection"
        onChange={handleChange}
        defaultValue=""
      >
        {genderOptions.map(({ value, label }) => (
          <MenuItem key={value} value={label}>
            {label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};
