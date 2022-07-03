import { Alert, Button, TextField, Typography } from "@mui/material";
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
} from "../../../components";
import { InputChangeHandler } from "../../../types";
import { maxWidth } from "../constants";
import { UserDetails } from "../types";
import { isFieldValueValid } from "../utils";

export type SectionUpdateDetailsStateProps = {
  isProcessing?: boolean;
  userDetails: UserDetails;
  ageGroupOptions: SelectFieldProps["options"];
  genderOptions: SelectFieldProps["options"];
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
  ageGroupOptions,
  genderOptions,
  onChange,
  onClickCheckin,
  onClickCancel,
}: SectionUpdateDetailsProps) => {
  const fullNameInputRef = useRef<HTMLInputElement>(null);

  const { fullName, ageGroup, email, gender, location, mobile } = useMemo(
    () => userDetails,
    [userDetails]
  );

  const areEmailAndMobileValid = useMemo<boolean>(() => {
    const disabledEmail = Boolean(userDetails.email.disabled);
    const disabledMobile = Boolean(userDetails.mobile.disabled);
    const hasEmail = Boolean(userDetails.email.value);
    const hasMobile = Boolean(userDetails.mobile.value);
    const hasValidEmail = isFieldValueValid("email", userDetails.email.value);
    const hasValidMobile = isFieldValueValid(
      "mobile",
      userDetails.mobile.value
    );
    // validation for hidden fields
    if (!hasEmail && hasMobile && disabledMobile) return true;
    if (!hasMobile && hasEmail && disabledEmail) return true;
    if (hasEmail && hasMobile && disabledEmail && disabledMobile) return true;
    if (
      hasEmail &&
      !disabledEmail &&
      hasValidEmail &&
      hasMobile &&
      disabledMobile
    )
      return true;
    if (
      hasEmail &&
      disabledEmail &&
      hasMobile &&
      !disabledMobile &&
      hasValidMobile
    )
      return true;
    // validation for shown fields
    if (!hasEmail && hasMobile && hasValidMobile) return true;
    if (!hasMobile && hasValidEmail && hasEmail) return true;
    if (hasEmail && hasMobile && hasValidMobile && hasValidEmail) return true;
    return false;
  }, [userDetails]);

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
          value: name === "email" ? (value as string).toLowerCase() : value,
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
    fullNameInputRef.current?.focus();
  }, []);

  return (
    <CenterOfViewport
      gap={5}
      width={"100%"}
      maxWidth={maxWidth}
      paddingX={1}
      paddingY={1}
      justifyContent="initial"
    >
      <Vertical gap={3} width={"100%"}>
        <Typography
          variant="h4"
          textAlign={"center"}
          sx={{ color: "text.primary" }}
        >
          Update Details
        </Typography>
        <TextField
          label="Full Name"
          color="info"
          required
          autoComplete="off"
          name="fullName"
          type="text"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={fullName.value}
          disabled={fullName.disabled}
          inputRef={fullNameInputRef}
        />
        <Horizontal gap={3}>
          <SelectField
            autoWidth
            autoComplete="off"
            label="Age Group"
            labelId="age-group"
            name="ageGroup"
            onChange={handleChangeSelectField}
            options={ageGroupOptions}
            required
            value={ageGroup.value}
            disabled={ageGroup.disabled}
          />
          <SelectField
            autoWidth
            autoComplete="off"
            label="Gender"
            labelId="gender"
            name="gender"
            onChange={handleChangeSelectField}
            options={genderOptions}
            required
            value={gender.value}
            disabled={gender.disabled}
          />
        </Horizontal>
        <LocationTextField
          helperText="Please type in city name..."
          onChange={handleChangeLocation}
          label="City / State / Country"
          required
          value={location.value}
          disabled={location.disabled}
        />
        <Alert severity="info" variant="standard">
          Please enter <strong>atleast one</strong> of <strong>Mobile</strong>{" "}
          and <strong>Email</strong>
        </Alert>
        <TextField
          label="Mobile"
          name="mobile"
          autoComplete="off"
          type="tel"
          variant="outlined"
          fullWidth
          helperText="Please include the country code - for ex. +9183392..."
          value={mobile.value}
          disabled={mobile.disabled}
          onChange={handleChange}
        />
        <TextField
          label="Email"
          autoComplete="off"
          type="email"
          name="email"
          variant="outlined"
          fullWidth
          value={email.value}
          disabled={email.disabled}
          onChange={handleChange}
        />
      </Vertical>
      <Horizontal gap={3}>
        <Button
          type="button"
          variant="outlined"
          onClick={onClickCancel}
          disabled={isProcessing}
        >
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
