import Box, { BoxProps } from "@mui/material/Box";
import React from "react";

export type CenterOfViewportProps = BoxProps;

/** A layout utility that places the children
 * at the center of the viewport.
 **/
export const CenterOfViewport = React.forwardRef<
  HTMLDivElement,
  CenterOfViewportProps
>(({ children, ...restProps }, ref) => {
  return (
    <Box
      marginX="auto"
      ref={ref}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
      boxSizing="border-box"
      {...restProps}
    >
      {children}
    </Box>
  );
});
