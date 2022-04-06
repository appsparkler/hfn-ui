import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, ButtonProps, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { CenterOfViewport } from "../../components/CenterOfViewport/CenterOfViewport";

export type CheckinSuccessSectionProps = {
  onClickReturn: ButtonProps["onClick"];
};

export const CheckinSuccessSection = ({
  onClickReturn,
}: CheckinSuccessSectionProps) => {
  return (
    <CenterOfViewport gap={10}>
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
    </CenterOfViewport>
  );
};
