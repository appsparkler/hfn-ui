import Box, { BoxProps } from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import map from "lodash/fp/map";
import { useCallback } from "react";
import { FormHelperText, FormHelperTextProps } from "@mui/material";

export type OptionValue = string | number;

export type SelectFieldOption = {
  value: OptionValue;
  label: MenuItemProps["children"];
};

export type SelectFieldProps = Omit<
  SelectProps,
  "value" | "onChange" | "defaultValue" | "label" | "error"
> & {
  //  Optional
  error?: SelectProps["error"];
  helperText?: FormHelperTextProps["children"];
  wrapperProps?: BoxProps;
  required?: boolean;

  // Required
  label: string;
  labelId: string;
  options: SelectFieldOption[];
  value: OptionValue;

  // Event Handlers
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
  required,
  onChange,
  wrapperProps = {},
  helperText,
  error,
  ...restSelectProps
}: SelectFieldProps) => {
  const handleChange = useCallback<
    NonNullable<SelectProps<OptionValue>["onChange"]>
  >(
    ({ target: { value } }) => {
      onChange(value);
    },
    [onChange]
  );

  return (
    <Box sx={{ width: "100%" }} {...wrapperProps}>
      <FormControl fullWidth required={required} error={error}>
        <InputLabel id={labelId}>{label}</InputLabel>
        <Select<OptionValue>
          error={error}
          labelId={labelId}
          onChange={handleChange}
          label={label}
          required={required}
          {...restSelectProps}
        >
          {map<SelectFieldOption, JSX.Element>(({ value, label }) => (
            <MenuItem value={value} key={value}>
              {label}
            </MenuItem>
          ))(options)}
        </Select>
        {helperText && (
          <FormHelperText error={error}>{helperText}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};
