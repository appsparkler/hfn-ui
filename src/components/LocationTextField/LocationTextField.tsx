import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import {
  RefinedCityStateCountryLocation,
  getUniqLocations,
  CityStateCountryLocation,
} from "./locations";
import { TextFieldProps } from "@mui/material";
import debounce from "lodash/fp/debounce";

const debounceGetAndSetLocationOptions = debounce(500)(
  (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setOptions: React.Dispatch<
      React.SetStateAction<readonly RefinedCityStateCountryLocation[]>
    >,
    firstLetter: string,
    query: string,
    api: string
  ): void => {
    try {
      setLoading(true);
      fetch(`${api}/${firstLetter}.json`)
        .then((res) => res.json())
        .then((json) => json.results)
        .then((results: CityStateCountryLocation[]) => {
          const uniqeLocations = getUniqLocations(results, query);
          setOptions(uniqeLocations);
        })
        .catch(() => {})
        .finally(() => {
          setLoading(false);
        });
    } catch (e) {}
  }
);

export type LocationTextFieldProps = {
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  size?: TextFieldProps["size"];
  variant?: TextFieldProps["variant"];
  api?: string;
  value?: RefinedCityStateCountryLocation;
  disabled?: boolean;
  onChange: (value: RefinedCityStateCountryLocation | undefined) => void;
};

export type LocationAutocompleteInputChange = NonNullable<
  AutocompleteProps<
    RefinedCityStateCountryLocation,
    undefined,
    undefined,
    undefined
  >["onInputChange"]
>;

export const LocationTextField = ({
  error,
  disabled,
  helperText,
  label,
  required,
  size,
  api = "https://static-gatsby.web.app/srcmapi/cities",
  variant,
  value,
  onChange,
}: LocationTextFieldProps) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<
    readonly RefinedCityStateCountryLocation[]
  >([]);
  const [query, setQuery] = React.useState<string>("");

  const handleInputChange = React.useCallback<
    NonNullable<TextFieldProps["onChange"]>
  >(
    ({ currentTarget: { value: query } }) => {
      const firstLetter = (query as string).slice(0, 1).toLowerCase();
      setQuery(query);
      if (Boolean(firstLetter))
        debounceGetAndSetLocationOptions(
          setLoading,
          setOptions,
          firstLetter,
          query,
          api
        );
      else console.log(query);
    },
    [api]
  );

  const handleChangeCityStateCountry = React.useCallback<
    NonNullable<
      AutocompleteProps<
        RefinedCityStateCountryLocation,
        undefined,
        undefined,
        undefined
      >["onChange"]
    >
  >(
    (evt, selectedItem) => {
      if (!selectedItem) {
        setQuery("");
      }
      if (selectedItem && typeof selectedItem !== "string") {
        onChange(selectedItem);
      }
    },
    [onChange]
  );

  const handleAutocompleteInputChange =
    React.useCallback<LocationAutocompleteInputChange>(
      (event, value, reason) => {
        if (reason === "clear") {
          onChange(undefined);
        }
      },
      [onChange]
    );

  return (
    <Autocomplete<RefinedCityStateCountryLocation>
      fullWidth
      autoComplete
      autoHighlight
      open={open}
      disabled={disabled}
      onInputChange={handleAutocompleteInputChange}
      value={value || null}
      noOptionsText="Please type city name..."
      onOpen={() => {
        if (!query) setOpen(false);
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      isOptionEqualToValue={(option, value) =>
        option.cityStateCountry === value.cityStateCountry
      }
      getOptionLabel={(option) => option.cityStateCountry}
      options={options}
      loading={loading}
      onChange={handleChangeCityStateCountry}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          error={error}
          helperText={helperText}
          label={label}
          onChange={handleInputChange}
          size={size}
          variant={variant}
          InputProps={{
            ...params.InputProps,
            autoComplete: "off",
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};
