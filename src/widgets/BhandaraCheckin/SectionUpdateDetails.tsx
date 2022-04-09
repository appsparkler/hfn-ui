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
  }, []);

  if (!show) {
    return null;
  }

  return (
    <CenterOfViewport
      gap={5}
      width={"100%"}
      maxWidth={400}
      paddingX={1}
      marginX="auto"
    >
      <Vertical gap={3} width={"100%"}>
        {userDetails.fullName.show ? (
          <TextField
            label="Full Name"
            required
            type="text"
            variant="outlined"
            fullWidth
            inputRef={fullNameRef}
            {...userDetails.fullName}
          />
        ) : null}
        <Horizontal gap={3}>
          {userDetails.ageGroup.show ? (
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
          ) : null}
          {userDetails.gender.show ? (
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
          ) : null}
        </Horizontal>
        {userDetails.location.show ? (
          <LocationTextField
            onChange={console.log}
            label="City / State / Country"
            required
            {...userDetails.location}
          />
        ) : null}
        {userDetails.email.show && userDetails.mobile.show ? (
          <Alert severity="info" variant="standard">
            Please enter <strong>atleast one</strong> of <strong>Mobile</strong>{" "}
            and <strong>Email</strong>
          </Alert>
        ) : null}
        {userDetails.mobile.show ? (
          <TextField
            label="Mobile"
            required
            type="tel"
            variant="outlined"
            fullWidth
            helperText="Please include the country code - for ex. +9183392..."
            {...userDetails.mobile}
          />
        ) : null}
        {userDetails.email.show ? (
          <TextField
            label="Email"
            required
            type="email"
            variant="outlined"
            fullWidth
            {...userDetails.email}
          />
        ) : null}
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
