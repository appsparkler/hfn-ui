import { Box, ThemeProvider, Typography } from "@mui/material";
import { theme } from "./theme";

export default {
  title: "Themeing",
};

const Example = () => (
  <Box sx={{ bgcolor: "background.default" }}>
    <Typography sx={{ color: "text.main" }}>Hello World</Typography>
  </Box>
);
export const theming = () => {
  return (
    <ThemeProvider theme={theme}>
      <Example />
    </ThemeProvider>
  );
};
