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
      marginX="auto"
      sx={{
        height: "100vh",
        width: "100vw",
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
};
