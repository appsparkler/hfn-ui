import { Typography } from "@mui/material";
import { CenterOfViewport } from "../../components";

export type SectionUpdateDetailsProps = {};

export const SectionUpdateDetails = ({}: SectionUpdateDetailsProps) => {
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
