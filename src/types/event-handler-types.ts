import { TextFieldProps } from "@mui/material";

// export type ClickHandler = NonNullable<ButtonProps["onClick"]>;

export type ClickHandler<T = HTMLButtonElement> = NonNullable<
  React.MouseEventHandler<T>
>;

export type InputChangeHandler = NonNullable<TextFieldProps["onChange"]>;
