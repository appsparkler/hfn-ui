import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  RefinedCityStateCountryLocation,
  getUniqLocations,
  CityStateCountryLocation,
} from "./locations";
import { FormControl, FormHelperText, TextFieldProps } from "@mui/material";
import debounce from "lodash/fp/debounce";

const getApi = () => localStorage.getItem("cities-api");

const debounceGetAndSetLocationOptions = debounce(500)(
  (
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setOptions: React.Dispatch<
      React.SetStateAction<readonly RefinedCityStateCountryLocation[]>
    >,
    firstLetter: string,
    query: string
  ): void => {
    try {
      setLoading(true);
      fetch(`${getApi()}/${firstLetter}.json`)
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

export type LocationInputFieldProps = {
  error?: boolean;
  helperText?: string;
  label?: string;
  required?: boolean;
  size?: TextFieldProps["size"];
  variant?: TextFieldProps["variant"];
  onChange: (value: RefinedCityStateCountryLocation) => void;
};

export const LocationInputField = ({
  error,
  helperText,
  label,
  required,
  size,
  variant,
  onChange,
}: LocationInputFieldProps) => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<
    readonly RefinedCityStateCountryLocation[]
  >([]);
  const [query, setQuery] = React.useState<string>("");

  const handleInputChange = React.useCallback<TextFieldProps["onChange"]>(
    ({ currentTarget: { value: query } }) => {
      const firstLetter = (query as string).substr(0, 1).toLowerCase();
      setQuery(query);
      if (Boolean(firstLetter))
        debounceGetAndSetLocationOptions(
          setLoading,
          setOptions,
          firstLetter,
          query
        );
    },
    []
  );

  const handleChangeCityStateCountry = React.useCallback<
    AutocompleteProps<
      RefinedCityStateCountryLocation,
      undefined,
      undefined,
      undefined,
      undefined
    >["onChange"]
  >(
    (evt, selectedItem) => {
      if (!selectedItem) {
        setQuery("");
      }
      if (typeof selectedItem !== "string") {
        onChange(selectedItem);
      }
    },
    [onChange]
  );

  return (
    <Box>
      <FormControl>
        <Autocomplete
          id="asynchronous-demo"
          sx={{ width: 300 }}
          autoComplete
          autoHighlight
          open={open}
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
              label={label}
              onChange={handleInputChange}
              size={size}
              variant={variant}
              InputProps={{
                ...params.InputProps,
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
        {helperText && (
          <FormHelperText error={error}>{helperText}</FormHelperText>
        )}
      </FormControl>
    </Box>
  );
};
