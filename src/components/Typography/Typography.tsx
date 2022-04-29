import { Typography as MuiTypography, TypographyProps } from "@mui/material";

export const Typography = (props: TypographyProps) => {
  return <MuiTypography color="text.primary" {...props} />;
};
