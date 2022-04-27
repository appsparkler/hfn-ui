import {
  Box,
  Button,
  Checkbox,
  CheckboxProps,
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
import { useCallback, useMemo } from "react";
import { maxWidth } from "widgets/BhandaraCheckin/constants";
import {
  mapToUpdatedCheckedItem,
  someAreCheckedAndNotDisabled,
} from "widgets/BhandaraCheckin/utils";

export type CheckboxItem = {
  id: string;
  name: string;
  checked?: boolean;
  disabled?: boolean;
};

export type SectionMultiCheckinStateProps = {
  isProcessing?: boolean;
  items: CheckboxItem[];
};

export type SectionMultiCheckinDispatchProps = {
  onClickCancel: () => void;
  onClickCheckin: () => void;
  onChange: (items: CheckboxItem[]) => void;
};

export type SectionMultiCheckinProps = SectionMultiCheckinStateProps &
  SectionMultiCheckinDispatchProps;

export const SectionMultipleCheckin = ({
  items,
  isProcessing,
  onChange,
  onClickCancel,
  onClickCheckin,
}: SectionMultiCheckinProps) => {
  const isDisabledCheckin = useMemo(
    () => isProcessing || !someAreCheckedAndNotDisabled(items),
    [isProcessing, items]
  );

  const handleChange = useCallback<(id: string) => CheckboxProps["onChange"]>(
    (id) => (_evt, checked) =>
      onChange(mapToUpdatedCheckedItem<CheckboxItem>(id, checked)(items)),
    [items, onChange]
  );

  return (
    <CenterOfViewport paddingY={2} maxWidth={maxWidth}>
      <Vertical gap={3} justifyContent="space-between" height={"100%"}>
        <Typography variant="h4">Registrations</Typography>
        <Box display="flex" flexDirection="column" maxHeight="70%">
          {map(({ id, checked, name, disabled }) => {
            return (
              <FormControlLabel
                key={id}
                disabled={disabled}
                name="multiple-checkin"
                control={
                  <Checkbox checked={checked} onChange={handleChange(id)} />
                }
                label={name}
              />
            );
          })(items)}
        </Box>
        <Horizontal gap={3}>
          <Button type="button" variant="outlined" onClick={onClickCancel}>
            CANCEL
          </Button>
          <AsyncButton
            type="button"
            onClick={onClickCheckin}
            isProcessing={isProcessing}
            disabled={isDisabledCheckin}
          >
            CHECK IN
          </AsyncButton>
        </Horizontal>
      </Vertical>
    </CenterOfViewport>
  );
};
