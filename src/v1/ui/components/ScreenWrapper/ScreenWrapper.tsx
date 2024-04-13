import { BoxProps } from "@mui/material";
import { Vertical } from "components";

export const ScreenWrapper: React.FC<BoxProps> = (props) => (
  <Vertical maxWidth={400} mx="auto" p={2} {...props}>
    {props.children}
  </Vertical>
);
