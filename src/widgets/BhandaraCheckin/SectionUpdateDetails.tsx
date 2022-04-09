import { BaseTextFieldProps, Box, Button, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import {
  CenterOfViewport,
  AsyncButton,
  LocationTextField,
} from "../../components";
import { Vertical } from "../../components/Boxes";

export type SectionUpdateDetailsStateProps = {
  show?: boolean;
};

export type SectionUpdateDetailsDispatchProps = {
  onClickCheckin: () => void;
  onClickCancel: () => void;
};

export type SectionUpdateDetailsProps = SectionUpdateDetailsStateProps &
  SectionUpdateDetailsDispatchProps;

export const SectionUpdateDetails = ({
  show,
  onClickCheckin,
  onClickCancel,
}: SectionUpdateDetailsProps) => {
  const fullNameRef: BaseTextFieldProps["inputRef"] = useRef(null);

  useEffect(() => {
    fullNameRef.current?.focus();

    return () => {};
  }, []);

  if (!show) {
    return null;
  }
  return (
    <CenterOfViewport
      gap={5}
      width={"100%"}
      maxWidth={400}
      padding={2}
      marginX="auto"
    >
      <Vertical gap={1} width={"100%"}>
        <TextField
          label="Full Name"
          required
          type="text"
          variant="outlined"
          fullWidth
          inputRef={fullNameRef}
          helperText=" "
        />
        <TextField
          label="Mobile"
          required
          type="tel"
          variant="outlined"
          fullWidth
          helperText=" "
        />
        <TextField
          label="Email"
          required
          type="email"
          variant="outlined"
          fullWidth
          helperText=" "
        />
        <LocationTextField
          onChange={console.log}
          label="City / State / Country"
          required
          helperText=" "
        />
      </Vertical>
      <Box display="flex" flexDirection={"row"} gap={3}>
        <Button type="button" variant="outlined" onClick={onClickCancel}>
          CANCEL
        </Button>
        <AsyncButton type="button" size="large" onClick={onClickCheckin}>
          CHECK IN
        </AsyncButton>
      </Box>
    </CenterOfViewport>
  );
};
