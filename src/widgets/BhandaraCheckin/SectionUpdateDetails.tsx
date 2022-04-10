import { Alert, BaseTextFieldProps, Button, TextField } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef } from "react";
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
import { InputChangeHandler } from "../../types";
import { UserDetails } from "./types";
import { isFieldValueValid } from "./utils";

export type SectionUpdateDetailsStateProps = {
  isProcessing?: boolean;
  userDetails: UserDetails;
  warning?: string;
};

export type SectionUpdateDetailsDispatchProps = {
  onClickCheckin: () => void;
  onClickCancel: () => void;
  onChange: (userDetails: UserDetails) => void;
};

export type SectionUpdateDetailsProps = SectionUpdateDetailsStateProps &
  SectionUpdateDetailsDispatchProps;

export const SectionUpdateDetails = ({
  isProcessing,
  userDetails,
  warning,
  onChange,
  onClickCheckin,
  onClickCancel,
}: SectionUpdateDetailsProps) => {
  const { fullName, ageGroup, email, gender, location, mobile } = useMemo(
    () => userDetails,
    [userDetails]
  );

  const fullNameRef: BaseTextFieldProps["inputRef"] = useRef(null);

  const areEmailAndMobileValid = useMemo<boolean>(() => {
    const hasEmail = Boolean(userDetails.email.value);
    const hasMobile = Boolean(userDetails.mobile.value);
    const hasValidEmail = isFieldValueValid("email", userDetails.email.value);
    const hasValidMobile = isFieldValueValid(
      "mobile",
      userDetails.mobile.value
    );
    if (!hasEmail && hasMobile && hasValidMobile) return true;
    if (!hasMobile && hasValidEmail && hasMobile) return true;
    if (hasEmail && hasMobile && hasValidMobile && hasValidEmail) return true;
    return false;
  }, [userDetails.email.value, userDetails.mobile.value]);

  const isValid = useMemo<boolean>(
    () =>
      Boolean(
        userDetails.ageGroup.isValid &&
          userDetails.ageGroup.isValid &&
          userDetails.fullName.isValid &&
          userDetails.gender.isValid &&
          userDetails.location.isValid &&
          areEmailAndMobileValid
      ),
    [
      areEmailAndMobileValid,
      userDetails.ageGroup.isValid,
      userDetails.fullName.isValid,
      userDetails.gender.isValid,
      userDetails.location.isValid,
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

  const handleChangeSelectField = useCallback<SelectFieldProps["onChange"]>(
    (name, value) => {
      onChange({
        ...userDetails,
        [name]: {
          ...userDetails[name as keyof UserDetails],
          value: value,
          isValid: isFieldValueValid("location", name),
        },
      });
    },
    [onChange, userDetails]
  );

  const handleChangeLocation = useCallback<LocationTextFieldProps["onChange"]>(
    (location) => {
      onChange({
        ...userDetails,
        location: {
          ...userDetails.location,
          value: location,
          isValid: isFieldValueValid("location", location),
        },
      });
    },
    [onChange, userDetails]
  );

  useEffect(() => {
    fullNameRef.current?.focus();
  }, []);

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
            onChange={handleChange}
            value={fullName.value}
            inputRef={fullNameRef}
          />
        ) : null}
        <Horizontal gap={3}>
          {userDetails.ageGroup.show ? (
            <SelectField
              autoWidth
              label="Age Group"
              labelId="age-group"
              name="ageGroup"
              onChange={handleChangeSelectField}
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
              name="gender"
              onChange={handleChangeSelectField}
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
            onChange={handleChangeLocation}
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
            name="mobile"
            required
            type="tel"
            variant="outlined"
            fullWidth
            helperText="Please include the country code - for ex. +9183392..."
            value={mobile.value}
            disabled={mobile.disabled}
            onChange={handleChange}
          />
        ) : null}
        {userDetails.email.show ? (
          <TextField
            label="Email"
            required
            type="email"
            name="email"
            variant="outlined"
            fullWidth
            value={email.value}
            disabled={email.disabled}
            onChange={handleChange}
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
      {warning ? (
        <Alert severity="warning" variant="standard" sx={{ width: "100%" }}>
          User is already checked in.
        </Alert>
      ) : null}
    </CenterOfViewport>
  );
};