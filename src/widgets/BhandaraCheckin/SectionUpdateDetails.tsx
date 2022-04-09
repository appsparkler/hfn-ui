import { BaseTextFieldProps, Box, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import { CenterOfViewport } from "../../components";
import { AsyncButton } from "../../components/AsyncButton/AsyncButton";

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
  const fullNameRef: BaseTextFieldProps["inputRef"] = useRef(null);

  useEffect(() => {
    fullNameRef.current.focus();

    return () => {};
  }, []);

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
      <Box display={"flex"} flexDirection="column" gap={3} width={"100%"}>
        <TextField
          label="Full Name"
          required
          type="text"
          variant="outlined"
          fullWidth
          inputRef={fullNameRef}
        />
        <TextField
          label="Mobile"
          required
          type="tel"
          variant="outlined"
          fullWidth
        />
        <TextField
          label="Email"
          required
          type="email"
          variant="outlined"
          fullWidth
        />
      </Box>
      <AsyncButton type="button" size="large" onClick={onClickCheckin}>
        CHECK IN
      </AsyncButton>
    </CenterOfViewport>
  );
};
