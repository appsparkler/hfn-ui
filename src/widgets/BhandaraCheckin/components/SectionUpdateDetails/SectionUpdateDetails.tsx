import { Alert, Button, TextField, Typography } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {
  CenterOfViewport,
  AsyncButton,
  Horizontal,
  Vertical,
  SelectField,
  SelectFieldProps,
} from "../../../../components";
import { ClickHandler, InputChangeHandler } from "../../../../types";
import { maxWidth } from "../../constants";
import { FormUserDetails } from "../../types";
import { isFieldValueValidV2 } from "../../utils";

export type SectionUpdateDetailsStateProps = {
  isProcessing?: boolean;
  userDetails: FormUserDetails;
  ageGroupOptions: SelectFieldProps["options"];
  genderOptions: SelectFieldProps["options"];
};

export type SectionUpdateDetailsDispatchProps = {
  onClickCheckin: (userDetails: FormUserDetails) => void;
  onClickCancel: () => void;
  onChange: (userDetails: FormUserDetails) => void;
};

export type SectionUpdateDetailsProps = SectionUpdateDetailsStateProps &
  SectionUpdateDetailsDispatchProps;

export const SectionUpdateDetailsV2 = ({
  isProcessing,
  userDetails,
  ageGroupOptions,
  genderOptions,
  onChange,
  onClickCheckin,
  onClickCancel,
}: SectionUpdateDetailsProps) => {
  const fullNameInputRef = useRef<HTMLInputElement>(null);
  const { fullName, ageGroup, email, gender, city, state, country, mobile } =
    useMemo(() => userDetails, [userDetails]);

  const areEmailAndMobileValid = useMemo<boolean>(() => {
    const disabledEmail = Boolean(userDetails.email.disabled);
    const disabledMobile = Boolean(userDetails.mobile.disabled);
    const hasEmail = Boolean(userDetails.email.value);
    const hasMobile = Boolean(userDetails.mobile.value);
    const hasValidEmail = isFieldValueValidV2("email", userDetails.email.value);
    const hasValidMobile = isFieldValueValidV2(
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
          userDetails.fullName.isValid &&
          userDetails.gender.isValid &&
          userDetails.city.isValid &&
          userDetails.state.isValid &&
          userDetails.country.isValid &&
          areEmailAndMobileValid
      ),
    [
      areEmailAndMobileValid,
      userDetails.ageGroup.isValid,
      userDetails.fullName.isValid,
      userDetails.gender.isValid,
      userDetails.city.isValid,
      userDetails.state.isValid,
      userDetails.country.isValid,
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
          ...userDetails[name as keyof FormUserDetails],
          value: name === "email" ? (value as string).toLowerCase() : value,
          isValid: isFieldValueValidV2(name as keyof FormUserDetails, value),
        },
      });
    },
    [onChange, userDetails]
  );

  const handleChangeSelectField = useCallback<SelectFieldProps["onChange"]>(
    (name, optionValue) => {
      onChange({
        ...userDetails,
        [name]: {
          ...userDetails[name as keyof FormUserDetails],
          value: optionValue,
          isValid: isFieldValueValidV2(
            name as keyof FormUserDetails,
            optionValue as string
          ),
        },
      });
    },
    [onChange, userDetails]
  );

  const handleClickCheckin = useCallback<ClickHandler>(() => {
    onClickCheckin(userDetails);
  }, [onClickCheckin, userDetails]);

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
          inputRef={fullNameInputRef}
          size="small"
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
            size="small"
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
            size="small"
          />
        </Horizontal>
        <TextField
          label="City"
          color="info"
          required
          autoComplete="off"
          name="city"
          type="text"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={city.value}
          size="small"
        />
        <TextField
          label="State"
          color="info"
          required
          autoComplete="off"
          name="state"
          type="text"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={state.value}
          size="small"
        />
        <TextField
          label="Country"
          color="info"
          required
          autoComplete="off"
          name="country"
          type="text"
          variant="outlined"
          fullWidth
          onChange={handleChange}
          value={country.value}
          size="small"
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
          size="small"
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
          size="small"
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
          onClick={handleClickCheckin}
          isProcessing={isProcessing}
          disabled={!isCheckinButtonEnabled}
        >
          CHECK IN
        </AsyncButton>
      </Horizontal>
    </CenterOfViewport>
  );
};
