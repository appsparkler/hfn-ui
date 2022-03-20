import FavouriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Alert, { AlertColor } from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Snackbar from "@mui/material/Snackbar";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel, {
  FormControlLabelProps,
} from "@mui/material/FormControlLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
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
  useRef,
  useState,
} from "react";
import PersonIcon from "@mui/icons-material/Person";
import map from "lodash/fp/map";
import { AsyncButton } from "../AsyncButton";
import { someStringsMatch } from "../../utils";
import { AsyncIconButton } from "../AsyncIconButton";
import { Button, FormControl, FormHelperText } from "@mui/material";
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
import { uniqueId } from "lodash/fp";

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

export type GenericCheckInVerboseProps = {
  value: {
    firstName: {
      value: string;
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
};

export const GenericCheckInVerbose: FC<GenericCheckInVerboseProps> = ({
  value,
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
  const handleChange = useCallback<
    TextFieldWithLabelProps["onChange"]
  >(() => {}, []);

  const handleChangeLocationInputField = useCallback<
    LocationInputFieldProps["onChange"]
  >(() => {}, []);

  const handleChangeAgeGroup = useCallback<
    SelectFieldProps["onChange"]
  >(() => {}, []);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        bg: "",
      }}
      gap={3}
    >
      <TextFieldWithLabel
        label="Full Name"
        required
        type="text"
        {...value.firstName}
        onChange={console.log}
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
        onChange={handleChangeAgeGroup}
        options={genderSelectOptions}
        {...gender}
      />
      <TextFieldWithLabel
        type="email"
        label="Email"
        onChange={console.log}
        {...email}
      />
      <Box display="flex" gap={2}>
        <Button variant="outlined" size="large">
          Cancel
        </Button>
        <AsyncButton
          variant="contained"
          size="large"
          onClick={console.log}
          errorMessage={`Checkin unsuccessful with ...`}
          successMessage={`CheckedIn with ...`}
          label="Check In"
        />
      </Box>
    </Box>
  );
};
