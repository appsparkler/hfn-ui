import Box, { BoxProps } from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import map from "lodash/fp/map";
import { useCallback } from "react";

export type OptionValue = string | number;

export type SelectFieldOption = {
  value: OptionValue;
  label: MenuItemProps["children"];
};

export type SelectFieldProps = Omit<
  SelectProps,
  "value" | "onChange" | "defaultValue" | "label"
> & {
  label: string;
  labelId: string;
  options: SelectFieldOption[];
  value: OptionValue;
  wrapperProps: BoxProps;
  onChange: (newValue: OptionValue) => void;
};

export const SelectField = ({
  labelId,
  label,
  options = [
    { value: 1, label: <em>Select Age</em> },
    { value: 10, label: "Ten" },
    { value: 20, label: "Twenty" },
    { value: 30, label: "Thirty" },
  ],
  value,
  onChange,
  wrapperProps = {},
  ...restSelectProps
}: SelectFieldProps) => {
  const handleChange = useCallback<SelectProps<OptionValue>["onChange"]>(
    ({ target: { value } }) => {
      onChange(value);
    },
    [onChange]
  );

  return (
    <Box sx={{ width: "100%" }} {...wrapperProps}>
      <FormControl fullWidth>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select<OptionValue>
          labelId={labelId}
          value={value}
          onChange={handleChange}
          label={label}
          {...restSelectProps}
        >
          {map<SelectFieldOption, JSX.Element>(({ value, label }) => (
            <MenuItem value={value} key={value}>
              {label}
            </MenuItem>
          ))(options)}
        </Select>
      </FormControl>
    </Box>
  );
};
