import { Alert, BaseTextFieldProps, Button, TextField } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  CenterOfViewport,
  AsyncButton,
  LocationTextField,
  Horizontal,
  Vertical,
  SelectField,
} from "../../components";
import { InputChangeHandler } from "../../types";
import { UserDetails } from "./types";
import { isFieldValueValid } from "./utils";

export type SectionUpdateDetailsStateProps = {
  show?: boolean;
  isProcessing?: boolean;
  userDetails: UserDetails;
};

export type SectionUpdateDetailsDispatchProps = {
  onClickCheckin: () => void;
  onClickCancel: () => void;
  onChange: (userDetails: UserDetails) => void;
};

export type SectionUpdateDetailsProps = SectionUpdateDetailsStateProps &
  SectionUpdateDetailsDispatchProps;

export const SectionUpdateDetails = ({
  show,
  isProcessing,
  userDetails,
  onChange,
  onClickCheckin,
  onClickCancel,
}: SectionUpdateDetailsProps) => {
  const { fullName, ageGroup, email, gender, location, mobile } = useMemo(
    () => userDetails,
    [userDetails]
  );

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

  const handleChange = useCallback<InputChangeHandler>(
    ({ currentTarget: { name, value } }) => {
      onChange({
        ...userDetails,
        [name]: {
          ...userDetails[name as keyof UserDetails],
          value,
          isValid: isFieldValueValid(name as keyof UserDetails, value),
        },
      });
    },
    [onChange, userDetails]
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
            name="fullName"
            type="text"
            variant="outlined"
            fullWidth
            inputRef={fullNameRef}
            onChange={handleChange}
            value={fullName.name}
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
              value={ageGroup.value}
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
              value={gender.value}
            />
          ) : null}
        </Horizontal>
        {userDetails.location.show ? (
          <LocationTextField
            onChange={console.log}
            label="City / State / Country"
            required
            value={location.value}
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
            value={mobile.value}
          />
        ) : null}
        {userDetails.email.show ? (
          <TextField
            label="Email"
            required
            type="email"
            variant="outlined"
            fullWidth
            value={email.value}
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
