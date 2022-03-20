import Box from "@mui/material/Box";
import {
  TextFieldWithLabel,
  TextFieldWithLabelProps,
} from "../TextFieldWithLabel";
import React, {
  ChangeEventHandler,
  FC,
  MouseEventHandler,
  useCallback,
  useMemo,
} from "react";
import { AsyncButton, AsyncButtonProps } from "../AsyncButton";
import { Button } from "@mui/material";
import {
  LocationInputField,
  LocationInputFieldProps,
} from "../CityStateCountryLocation";
import {
  OptionValue,
  SelectField,
  SelectFieldOption,
  SelectFieldProps,
} from "../SelectField";
import { some, uniqueId, values } from "lodash/fp";
import { RefinedCityStateCountryLocation } from "../CityStateCountryLocation/locations";

export type InputWithPopoverProps = {
  helperText?: string;
};

export type ClickHandler = MouseEventHandler<HTMLButtonElement>;

export type InputChangeEventHandler = ChangeEventHandler<HTMLInputElement>;

export type MobileNumberOrEmailOrAbhyasiId =
  | { mobileNumber: string }
  | { email: string }
  | { abhyasiId: string };

export type Favourite = {
  id: string;
  name: string;
} & MobileNumberOrEmailOrAbhyasiId;

export type VerboseCheckInFormValue<T> = {
  value: T;
  helperText: string;
  error: boolean;
};

export type GenericCheckInVerboseValue = {
  fullName: {
    value: string;
    helperText: string;
    error: boolean;
  };
  location: {
    value: RefinedCityStateCountryLocation;
    helperText: string;
    error: boolean;
  };
  ageGroup: {
    value: OptionValue;
    helperText: string;
    error: boolean;
  };
  gender: {
    value: OptionValue;
    helperText: string;
    error: boolean;
  };
  email: {
    value: string;
    helperText: string;
    error: boolean;
  };
};

const validateFullName = (
  fullNameValue: string
): VerboseCheckInFormValue<string> => {
  return {
    error: Boolean(fullNameValue),
    helperText: "This field is required",
    value: fullNameValue,
  };
};
const validateLocation = (
  location: RefinedCityStateCountryLocation
): VerboseCheckInFormValue<RefinedCityStateCountryLocation> => {
  return {
    error: Boolean(location),
    helperText: "Location details are required",
    value: location,
  };
};
const validateAgeGroup = (
  ageGroup: OptionValue
): VerboseCheckInFormValue<OptionValue> => {
  return {
    error: Boolean(ageGroup),
    helperText: "Age group is required",
    value: ageGroup,
  };
};
const validateEmail = (email: string): VerboseCheckInFormValue<string> => {
  return {
    error: Boolean(email),
    helperText: "Email is required.",
    value: email,
  };
};
const validateGender = (
  gender: OptionValue
): VerboseCheckInFormValue<OptionValue> => {
  return {
    error: Boolean(gender),
    helperText: "Gender is required.",
    value: gender,
  };
};
export const validateCheckInDetails = (
  userDetails: GenericCheckInVerboseValue
): GenericCheckInVerboseValue => {
  const { fullName, location, ageGroup, email, gender } = userDetails;

  return {
    fullName: validateFullName(fullName.value),
    location: validateLocation(location.value),
    ageGroup: validateAgeGroup(ageGroup.value),
    email: validateEmail(email.value),
    gender: validateGender(gender.value),
  };
};

export type GenericCheckInVerboseProps = {
  value: GenericCheckInVerboseValue;
  onChange: (updatedValue: GenericCheckInVerboseValue) => void;
  onClickCheckIn: (fieldValues: GenericCheckInVerboseValue) => void;
  onClickCancel: ClickHandler;
};

export const GenericCheckInVerbose: FC<GenericCheckInVerboseProps> = ({
  value,
  onChange,
  onClickCheckIn,
  onClickCancel,
}) => {
  const { ageGroup, gender, email } = value;
  const ageGroupOptions = useMemo<SelectFieldOption[]>(
    () => [
      { value: "0 - 4", label: "0 - 4" },
      { value: "5 - 9", label: "5 - 9" },
      { value: "10 - 14", label: "10 - 14" },
    ],
    []
  );
  const genderSelectOptions = useMemo<SelectFieldOption[]>(
    () => [
      { label: "Female", value: "Female" },
      { label: "Male", value: "Male" },
      { label: "Unspecified", value: "Unspecified" },
    ],
    []
  );
  const ageGroupSelectFieldId = useMemo(() => uniqueId("select-field-"), []);
  const genderSelectFieldId = useMemo(() => uniqueId("select-field-"), []);

  const handleChangeFullName = useCallback<TextFieldWithLabelProps["onChange"]>(
    (updatedFullName) => {
      onChange({
        ...value,
        fullName: {
          ...value.fullName,
          value: updatedFullName,
        },
      });
    },
    [onChange, value]
  );

  const handleChangeEmail = useCallback<TextFieldWithLabelProps["onChange"]>(
    (updatedEmail) => {
      onChange({
        ...value,
        email: {
          ...value.fullName,
          value: updatedEmail,
        },
      });
    },
    [onChange, value]
  );

  const handleChangeLocationInputField = useCallback<
    LocationInputFieldProps["onChange"]
  >(
    (locationDetails) => {
      onChange({
        ...value,
        location: {
          ...value.location,
          value: locationDetails,
        },
      });
    },
    [onChange, value]
  );

  const handleChangeAgeGroup = useCallback<SelectFieldProps["onChange"]>(
    (ageGroupValue) => {
      onChange({
        ...value,
        ageGroup: {
          ...value.ageGroup,
          value: ageGroupValue,
        },
      });
    },
    [onChange, value]
  );

  const handleChangeGender = useCallback<SelectFieldProps["onChange"]>(
    (genderValue) => {
      onChange({
        ...value,
        gender: {
          ...value.gender,
          value: genderValue,
        },
      });
    },
    [onChange, value]
  );

  const handleClickCheckIn = useCallback<
    AsyncButtonProps["onClick"]
  >(async () => {
    const validatedValues: GenericCheckInVerboseValue =
      validateCheckInDetails(value);
    const someHaveError = some<{ error: boolean }>((item) => item.error);
    const validationValues =
      values<GenericCheckInVerboseValue>(validatedValues);
    const userInfoHasErrors = someHaveError(validationValues);
    if (userInfoHasErrors) {
      onChange(validatedValues);
    } else {
      onClickCheckIn(validatedValues);
    }
    // await onClickCheckIn(value);
  }, [onChange, onClickCheckIn, value]);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        bg: "",
        width: "100%",
        minWidth: 300,
        maxWidth: 400,
      }}
      gap={3}
    >
      <TextFieldWithLabel
        label="Full Name"
        required
        type="text"
        {...value.fullName}
        onChange={handleChangeFullName}
      />
      <LocationInputField
        onChange={handleChangeLocationInputField}
        label="City, State, Country"
        required
      />
      <SelectField
        label="Age Group"
        required
        labelId={ageGroupSelectFieldId}
        onChange={handleChangeAgeGroup}
        options={ageGroupOptions}
        {...ageGroup}
      />
      <SelectField
        label="Gender"
        required
        labelId={genderSelectFieldId}
        onChange={handleChangeGender}
        options={genderSelectOptions}
        {...gender}
      />
      <TextFieldWithLabel
        type="email"
        label="Email"
        onChange={handleChangeEmail}
        {...email}
      />
      <Box display="flex" gap={2}>
        <Button
          variant="outlined"
          size="large"
          type="button"
          onClick={onClickCancel}
        >
          Cancel
        </Button>
        <AsyncButton
          variant="contained"
          size="large"
          onClick={handleClickCheckIn}
          label="Check In"
        />
      </Box>
    </Box>
  );
};
