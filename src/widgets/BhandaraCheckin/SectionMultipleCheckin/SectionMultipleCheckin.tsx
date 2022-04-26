import {
  Box,
  Button,
  ButtonProps,
  Checkbox,
  FormControlLabel,
  Typography,
} from "@mui/material";
import {
  Horizontal,
  Vertical,
  CenterOfViewport,
  AsyncButton,
} from "components";
import { times } from "lodash/fp";
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
    <CenterOfViewport paddingY={2} maxWidth={maxWidth}>
      <Vertical gap={3} justifyContent="space-between" height={"100%"}>
        <Typography variant="h4">Registrations</Typography>
        <Box
          display="flex"
          flexDirection="column"
          maxHeight="70%"
          overflow="auto"
        >
          {times((index) => (
            <FormControlLabel
              key={index}
              control={
                <Checkbox checked={false} onChange={console.log} name="jason" />
              }
              label="Hello"
            />
          ))(50)}
        </Box>
        <Horizontal gap={3}>
          <Button type="button" variant="outlined">
            CANCEL
          </Button>
          <AsyncButton type="button">CHECK IN</AsyncButton>
        </Horizontal>
      </Vertical>
    </CenterOfViewport>
  );
};
