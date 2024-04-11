import { CheckCircle } from "@mui/icons-material";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography/Typography";
import { Vertical } from "components";

export const SuccessScreen = () => {
  return (
    <Vertical
      alignItems={"center"}
      justifyContent={"center"}
      maxWidth={400}
      sx={{
        width: "auto",
        mx: "auto",
        p: 2,
      }}
      gap={2}
    >
      <Vertical mt={12} justifyContent={"center"} alignItems={"center"}>
        <CheckCircle
          color="success"
          sx={{
            fontSize: 80,
          }}
        />
        <Typography variant="h5">Checked In</Typography>
      </Vertical>
      <Button type="button" variant="contained" size="large" disableElevation>
        Return to Main Screen
      </Button>
    </Vertical>
  );
};
