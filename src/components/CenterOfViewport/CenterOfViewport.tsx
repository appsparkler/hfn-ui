import Box, { BoxProps } from "@mui/material/Box";

export type CenterOfViewportProps = BoxProps;

/** A layout utility that places the children
 * at the center of the viewport.
 **/
export const CenterOfViewport = ({
  children,
  ...restProps
}: CenterOfViewportProps) => {
  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "auto",
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
      }}
      {...restProps}
    >
      {children}
    </Box>
  );
};
