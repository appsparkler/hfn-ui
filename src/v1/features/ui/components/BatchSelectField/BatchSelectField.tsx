import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export const BatchSelectField: React.FC<{
  defaultValue: string;
  onChange: (selectedBatch: string) => void;
}> = ({ defaultValue, onChange }) => {
  const handleChange: (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => void = (evt) => {
    const batch = evt.target.value;
    onChange(batch);
  };
  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel id="batch-label">Batch</InputLabel>
      <Select
        labelId="batch-label"
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        <MenuItem value="batch-1">batch-1</MenuItem>
        <MenuItem value="batch-2, batch-1">batch-2, batch-1</MenuItem>
      </Select>
    </FormControl>
  );
};
