import { Box } from "@mui/material";
import { Vertical } from "components";

export const MultiCheckinScreen = () => {
  return (
    <Vertical sx={{ display: "flex", height: "100vh" }}>
      <Box>1</Box>
      <Box sx={{ flex: 1 }}>2</Box>
      <Box>3</Box>
    </Vertical>
  );
};
