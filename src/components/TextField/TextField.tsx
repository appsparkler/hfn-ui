import FormControl from "@mui/material/FormControl";
import { SelectProps } from "@mui/material/Select";
import { useCallback } from "react";
import {
  BoxProps,
  FormHelperTextProps,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { InputChangeHandler } from "../../types";

export type CustomTextFieldProps = Omit<
  TextFieldProps,
  "onChange" | "variant"
> & {
  //  Optional
  type?: TextFieldProps["type"];
  variant?: TextFieldProps["variant"];
  error?: SelectProps["error"];
  helperText?: FormHelperTextProps["children"];
  wrapperProps?: BoxProps;

  // Required
  label: string;
  // labelId: string;

  // Event Handlers
  onChange: (newValue: string) => void;
};

export const CustomTextField = ({
  onChange,
  error,
  helperText,
  ...restTextFieldProps
}: CustomTextFieldProps) => {
  const handleChange = useCallback<InputChangeHandler>(
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
        error={error}
        helperText={helperText || " "}
        {...restTextFieldProps}
      />
    </FormControl>
  );
};
