import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";

export const BatchSelectField: React.FC<{
  defaultValue: string;
  batches: string[];
  onChange: (name: string, selectedBatch: string) => void;
}> = ({ defaultValue, batches, onChange }) => {
  const handleChange: (
    event: SelectChangeEvent<string>,
    child: React.ReactNode
  ) => void = (evt) => {
    const batch = evt.target.value;
    onChange("batch", batch);
  };
  return (
    <FormControl variant="standard" fullWidth>
      <InputLabel id="batch-label">Batch</InputLabel>
      <Select
        name="batch"
        labelId="batch-label"
        defaultValue={defaultValue}
        onChange={handleChange}
      >
        {batches.map((batch) => {
          return (
            <MenuItem key={batch} value={batch}>
              {batch}
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};
