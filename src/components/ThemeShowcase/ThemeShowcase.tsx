import { Box, useTheme } from "@mui/material";
import React from "react";
export const ThemeShowcase = () => {
  const theme = useTheme();
  return (
    <Box>
      <pre>{JSON.stringify(theme, null, 2)}</pre>
    </Box>
  );
};
