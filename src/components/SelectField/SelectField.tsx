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
  required?: boolean;

  // Required
  label: string;
  labelId: string;
  options: SelectFieldOption[];
  value?: OptionValue;

  // Event Handlers
  onChange: (name: string, newValue: OptionValue) => void;
};

export const SelectField = ({
  labelId,
  label,
  options = [],
  value,
  required,
  helperText,
  error,
  size,
  name,
  onChange,
  ...restSelectProps
}: SelectFieldProps) => {
  const isSelected = useCallback<($value: OptionValue) => boolean>(
    ($value) => value === $value,
    [value]
  );

  const handleChange = useCallback<
    NonNullable<SelectProps<OptionValue>["onChange"]>
  >(
    ({ target: { name, value } }) => {
      onChange(name, value);
    },
    [onChange]
  );

  return (
    <FormControl required={required} error={error} fullWidth>
      <InputLabel id={labelId}>{label}</InputLabel>
      <Select<OptionValue>
        error={error}
        size={size}
        labelId={labelId}
        name={name}
        onChange={handleChange}
        label={label}
        required={required}
        value={value}
        {...restSelectProps}
      >
        {map<SelectFieldOption, JSX.Element>(({ value, label }) => (
          <MenuItem value={value} key={value} selected={isSelected(value)}>
            {label}
          </MenuItem>
        ))(options)}
      </Select>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
};
