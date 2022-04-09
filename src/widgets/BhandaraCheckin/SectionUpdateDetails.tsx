import {
  Alert,
  BaseTextFieldProps,
  Button,
  TextField,
  TextFieldProps,
} from "@mui/material";
import { useEffect, useMemo, useRef } from "react";
import {
  CenterOfViewport,
  AsyncButton,
  LocationTextField,
  Horizontal,
  Vertical,
  SelectField,
  LocationTextFieldProps,
  SelectFieldProps,
} from "../../components";

export type UserDetailsValueWrapper<T> = Partial<T> & {
  show?: boolean;
  isValid?: boolean;
};

export type SectionUpdateDetailsStateProps = {
  show?: boolean;
  isProcessing?: boolean;
  userDetails: {
    fullName: UserDetailsValueWrapper<TextFieldProps>;
    mobile: UserDetailsValueWrapper<TextFieldProps>;
    email: UserDetailsValueWrapper<TextFieldProps>;
    location: UserDetailsValueWrapper<LocationTextFieldProps>;
    ageGroup: UserDetailsValueWrapper<SelectFieldProps>;
    gender: UserDetailsValueWrapper<SelectFieldProps>;
  };
};

export type SectionUpdateDetailsDispatchProps = {
  onClickCheckin: () => void;
  onClickCancel: () => void;
};

export type SectionUpdateDetailsProps = SectionUpdateDetailsStateProps &
  SectionUpdateDetailsDispatchProps;

export const SectionUpdateDetails = ({
  show,
  isProcessing,
  userDetails,
  onClickCheckin,
  onClickCancel,
}: SectionUpdateDetailsProps) => {
  const fullNameRef: BaseTextFieldProps["inputRef"] = useRef(null);

  const isValid = useMemo<boolean>(
    () =>
      Boolean(
        userDetails.ageGroup.isValid &&
          userDetails.ageGroup.isValid &&
          userDetails.fullName.isValid &&
          userDetails.gender.isValid &&
          userDetails.location.isValid &&
          userDetails.mobile.isValid
      ),
    [
      userDetails.ageGroup.isValid,
      userDetails.fullName.isValid,
      userDetails.gender.isValid,
      userDetails.location.isValid,
      userDetails.mobile.isValid,
    ]
  );

  const isCheckinButtonEnabled = useMemo<boolean>(
    () => isValid && !isProcessing,
    [isProcessing, isValid]
  );

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
      <Vertical gap={3} width={"100%"}>
        <TextField
          label="Full Name"
          required
          type="text"
          variant="outlined"
          fullWidth
          inputRef={fullNameRef}
          {...userDetails.fullName}
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
            required
            {...userDetails.ageGroup}
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
            required
            {...userDetails.gender}
          />
        </Horizontal>
        <LocationTextField
          onChange={console.log}
          label="City / State / Country"
          required
          {...userDetails.location}
        />
        <Alert severity="info" variant="standard">
          Please enter <strong>atleast one</strong> of <strong>Mobile</strong>{" "}
          and <strong>Email</strong>
        </Alert>
        <TextField
          label="Mobile"
          required
          type="tel"
          variant="outlined"
          fullWidth
          {...userDetails.mobile}
        />
        <TextField
          label="Email"
          required
          type="email"
          variant="outlined"
          fullWidth
          {...userDetails.email}
        />
      </Vertical>
      <Horizontal gap={3}>
        <Button type="button" variant="outlined" onClick={onClickCancel}>
          CANCEL
        </Button>
        <AsyncButton
          type="button"
          size="large"
          onClick={onClickCheckin}
          isProcessing={isProcessing}
          disabled={!isCheckinButtonEnabled}
        >
          CHECK IN
        </AsyncButton>
      </Horizontal>
    </CenterOfViewport>
  );
};
