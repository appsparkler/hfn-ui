import { Button, Typography } from "@mui/material";
import { CenterOfViewport } from "../../components";

export type SectionUpdateDetailsStateProps = {
  show?: boolean;
};

export type SectionUpdateDetailsDispatchProps = {
  onClickCheckin: () => void;
};

export type SectionUpdateDetailsProps = SectionUpdateDetailsStateProps &
  SectionUpdateDetailsDispatchProps;

export const SectionUpdateDetails = ({
  show,
  onClickCheckin,
}: SectionUpdateDetailsProps) => {
  if (!show) {
    return null;
  }
  return (
    <CenterOfViewport
      gap={10}
      width={"100%"}
      maxWidth={400}
      padding={2}
      marginX="auto"
    >
      <Typography variant="h4">Update Details</Typography>
      <Button type="button" size="large" onClick={onClickCheckin}>
        CHECK IN
      </Button>
    </CenterOfViewport>
  );
};
