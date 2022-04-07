import { Typography } from "@mui/material";
import { CenterOfViewport } from "../../components";

export type SectionUpdateDetailsStateProps = {
  show?: boolean;
};

export type SectionUpdateDetailsDispatchProps = {};

export type SectionUpdateDetailsProps = SectionUpdateDetailsStateProps &
  SectionUpdateDetailsDispatchProps;

export const SectionUpdateDetails = ({ show }: SectionUpdateDetailsProps) => {
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
    </CenterOfViewport>
  );
};
