import { BaseTextFieldProps, Button, TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import {
  CenterOfViewport,
  AsyncButton,
  LocationTextField,
  Horizontal,
  Vertical,
  SelectField,
} from "../../components";

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
        <Horizontal gap={3}>
          <SelectField
            autoWidth
            label="Age Group"
            labelId="age-group"
            onChange={console.log}
            options={[
              { label: "0-10", value: "0-10" },
              { label: "11-20", value: "11-20" },
            ]}
            value={""}
            required
          />
          <SelectField
            autoWidth
            label="Gender"
            labelId="gender"
            onChange={console.log}
            options={[
              { label: "Female", value: "female" },
              { label: "Male", value: "male" },
              { label: "Unspecified", value: "unspecified" },
            ]}
            value={""}
            required
          />
        </Horizontal>
      </Vertical>
      <Horizontal gap={3}>
        <Button type="button" variant="outlined" onClick={onClickCancel}>
          CANCEL
        </Button>
        <AsyncButton type="button" size="large" onClick={onClickCheckin}>
          CHECK IN
        </AsyncButton>
      </Horizontal>
    </CenterOfViewport>
  );
};
