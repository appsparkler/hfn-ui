import { Alert, Button, TextField, Typography } from "@mui/material";
import { useCallback, useMemo } from "react";
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
import { ageGroupOptions, maxWidth } from "./constants";
import { UserDetails } from "./types";
import { isFieldValueValid } from "./utils";

export type SectionUpdateDetailsStateProps = {
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

  const areEmailAndMobileValid = useMemo<boolean>(() => {
    const showEmail = Boolean(userDetails.email.show);
    const showMobile = Boolean(userDetails.mobile.show);
    const hasEmail = Boolean(userDetails.email.value);
    const hasMobile = Boolean(userDetails.mobile.value);
    const hasValidEmail = isFieldValueValid("email", userDetails.email.value);
    const hasValidMobile = isFieldValueValid(
      "mobile",
      userDetails.mobile.value
    );
    // validation for hidden fields
    if (!hasEmail && hasMobile && !showMobile) return true;
    if (!hasMobile && hasEmail && !showEmail) return true;
    if (hasEmail && hasMobile && !showEmail && !showMobile) return true;
    if (hasEmail && hasMobile && !showEmail && showMobile && hasValidMobile)
      return true;
    if (hasEmail && hasMobile && !showMobile && showEmail && hasValidEmail)
      return true;
    // validation for shown fields
    if (!hasEmail && hasMobile && hasValidMobile) return true;
    if (!hasMobile && hasValidEmail && hasEmail) return true;
    if (hasEmail && hasMobile && hasValidMobile && hasValidEmail) return true;
    return false;
  }, [
    userDetails.email.show,
    userDetails.email.value,
    userDetails.mobile.show,
    userDetails.mobile.value,
  ]);

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

  return (
    <CenterOfViewport gap={5} width={"100%"} maxWidth={maxWidth} paddingX={1}>
      <Typography variant="h4">Update Details</Typography>
      <Vertical gap={3} width={"100%"}>
        <TextField
          label="Full Name"
          required
          name="fullName"
          type="text"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={fullName.value}
          disabled={fullName.disabled}
        />
        {userDetails.gender.show || userDetails.ageGroup.show ? (
          <Horizontal gap={3}>
            {userDetails.ageGroup.show ? (
              <SelectField
                autoWidth
                label="Age Group"
                labelId="age-group"
                name="ageGroup"
                onChange={handleChangeSelectField}
                options={ageGroupOptions}
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
        ) : null}
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
    </CenterOfViewport>
  );
};
