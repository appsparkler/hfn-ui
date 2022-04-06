import Box, { BoxProps } from "@mui/material/Box";

export type PageCenterProps = BoxProps;

export const CenterOfViewport = ({
  children,
  ...restProps
}: PageCenterProps) => {
  return (
    <Box
      sx={{
        height: "100vh",
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
