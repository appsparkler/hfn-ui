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
  // TextField,
  // TextFieldProps,
} from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { noop } from "lodash/fp";
import React from "react";

export type TextFieldWithLabelProps = Omit<
  TextFieldProps,
  "onChange" | "variant" | "error"
> & {
  onChange: (value: string) => void;
  error?: boolean;
  variant?: TextFieldProps["variant"];
  helperText?: FormHelperTextProps["children"];
};

export const TextFieldWithLabel = ({
  onChange = noop,
  variant,
  error,
  helperText,
  ...textFieldProps
}: TextFieldWithLabelProps) => {
  const handleChange = useCallback<TextFieldProps["onChange"]>(
    ({ currentTarget: { value } }) => {
      onChange(value);
    },
    [onChange]
  );

  return (
    <Box sx={{ width: "100%" }}>
      <FormControl sx={{ width: "100%" }}>
        <TextField
          variant={variant}
          onChange={handleChange}
          error={error}
          {...textFieldProps}
        />
        {helperText && (
          <FormHelperText error={error}>{helperText}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};
