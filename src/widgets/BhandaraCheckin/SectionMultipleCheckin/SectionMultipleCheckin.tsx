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
import { map } from "lodash/fp";
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
          {map(({ id, checked, name, disabled }) => {
            return (
              <FormControlLabel
                key={id}
                disabled={disabled}
                control={
                  <Checkbox
                    checked={checked}
                    onChange={console.log}
                    name="multiple-checkin"
                  />
                }
                label={name}
              />
            );
          })([
            { id: 1, checked: false, name: "A***Y C***A" },
            { id: 2, checked: true, name: "M**** J****SON", disabled: true },
            { id: 3, checked: true, name: "A***H B*****N" },
          ])}
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
