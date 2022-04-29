import Box, { BoxProps } from "@mui/material/Box";

/** A layout utility for flex-box in column direction
 **/
export const Vertical = (boxProps: BoxProps) => (
  <Box display="flex" flexDirection={"column"} {...boxProps} />
);

export const Horizontal = (boxProps: BoxProps) => (
  <Box display="flex" flexDirection={"row"} {...boxProps} />
);
