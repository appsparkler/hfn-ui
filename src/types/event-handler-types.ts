import { ButtonProps, TextFieldProps } from "@mui/material";

export type ClickHandler = NonNullable<ButtonProps["onClick"]>;

export type InputChangeHandler = NonNullable<TextFieldProps["onChange"]>;
