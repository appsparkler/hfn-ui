import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, ButtonProps, Typography } from "@mui/material";
import Box from "@mui/material/Box";

export type CheckinSuccessSectionProps = {
  onClickReturn: ButtonProps["onClick"];
};

export const CheckinSuccessSection = ({
  onClickReturn,
}: CheckinSuccessSectionProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginY: "auto",
      }}
      gap={10}
    >
      <Box display="flex" alignItems="center" flexDirection="column">
        <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
        <Typography variant="h5">{`Checked In`}</Typography>
      </Box>
      <Button
        type="button"
        variant="contained"
        size="large"
        onClick={onClickReturn}
      >
        Return to main page
      </Button>
    </Box>
  );
};
