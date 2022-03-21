import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import { useCallback } from "react";
import { FormHelperText, FormHelperTextProps } from "@mui/material";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { noop } from "lodash/fp";
import { InputChangeEventHandler } from "../GenericCheckInVerbose";

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
  const handleChange = useCallback<InputChangeEventHandler>(
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
