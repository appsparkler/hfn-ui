import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Button, ButtonProps, Typography } from "@mui/material";
import { Vertical } from "../../../components";
import { CenterOfViewport } from "../../../components/CenterOfViewport/CenterOfViewport";
import { maxWidth } from "../constants";

export type SectionCheckinStateProps = {};

export type SectionCheckinDispatchProps = {
  onClickReturn: ButtonProps["onClick"];
};

export type SectionCheckinSuccessProps = SectionCheckinStateProps &
  SectionCheckinDispatchProps;

export const SectionMultipleCheckin = ({
  onClickReturn,
}: SectionCheckinSuccessProps) => {
  return (
    <CenterOfViewport gap={10} paddingX={1} maxWidth={maxWidth}>
      <Vertical alignItems={"center"}>
        <CheckCircleIcon color="success" sx={{ fontSize: 80 }} />
        <Typography variant="h5">{`Checked In`}</Typography>
      </Vertical>
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
