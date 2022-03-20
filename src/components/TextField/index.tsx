import Box, { BoxProps } from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem, { MenuItemProps } from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectProps } from "@mui/material/Select";
import map from "lodash/fp/map";
import { useCallback } from "react";
import {
  FormHelperText,
  FormHelperTextProps,
  TextField,
  TextFieldProps,
} from "@mui/material";

export type CustomTextFieldProps = Omit<
  TextFieldProps,
  "onChange" | "variant"
> & {
  //  Optional
  variant?: TextFieldProps["variant"];
  error?: SelectProps["error"];
  helperText?: FormHelperTextProps["children"];
  wrapperProps?: BoxProps;

  // Required
  label: string;
  labelId: string;

  // Event Handlers
  onChange: (newValue: string) => void;
};

export const CustomTextField = ({
  onChange,
  ...restTextFieldProps
}: CustomTextFieldProps) => {
  const { error } = restTextFieldProps;
  const handleChange = useCallback<TextFieldProps["onChange"]>(
    ({ target: { value } }) => {
      onChange(value);
    },
    [onChange]
  );

  return (
    <FormControl sx={{ width: "100%" }}>
      <TextField
        onChange={handleChange}
        variant="outlined"
        {...restTextFieldProps}
      />
      <FormHelperText error={error}>Mobile # is invalid</FormHelperText>
    </FormControl>
  );
};
