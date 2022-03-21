import FormControl from "@mui/material/FormControl";
import { SelectProps } from "@mui/material/Select";
import { useCallback } from "react";
import {
  BoxProps,
  FormHelperText,
  FormHelperTextProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { InputChangeEventHandler } from "../GenericCheckInVerbose";

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
  const handleChange = useCallback<InputChangeEventHandler>(
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
