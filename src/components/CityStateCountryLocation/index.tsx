import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete, { AutocompleteProps } from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import {
  // locations,
  RefinedCityStateCountryLocation,
  getUniqLocations,
  CityStateCountryLocation,
} from "./locations";
import { TextFieldProps } from "@mui/material";
import { debounce, remove } from "lodash/fp";
import some from "lodash/fp/some";
import { filter } from "lodash";

const getApi = () => localStorage.getItem("cities-api");

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

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
          // setLoading(false);
        })
        .catch(() => {
          // setLoading(false);
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (e) {}
  }
);

export type LocationInputFieldProps = {
  onChange: (value: RefinedCityStateCountryLocation) => void;
};

const removeWhichDoNotStartWithQuery = (query: string) =>
  remove<RefinedCityStateCountryLocation>(
    (item) => item.cityStateCountry.indexOf(query) > 0
  );

export const LocationInputField = ({ onChange }) => {
  const api = React.useMemo<string>(() => getApi(), []);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<
    readonly RefinedCityStateCountryLocation[]
  >([]);
  const [query, setQuery] = React.useState<string>("");
  const dispalyedOptions = React.useMemo<
    RefinedCityStateCountryLocation[]
  >(() => {
    if (!Boolean(query)) return [];
    return removeWhichDoNotStartWithQuery(query)(options);
  }, [options, query]);
  // const loading = open && options.length === 0;

  // React.useEffect(() => {
  //   let active = true;

  //   if (!loading) {
  //     return undefined;
  //   }

  //   (async () => {
  //     console.log(1e4);
  //     await sleep(1e3); // For demo purposes.

  //     if (active) {
  //       setOptions([...locations]);
  //     }
  //   })();

  //   return () => {
  //     active = false;
  //   };
  // }, [loading]);
  const [searchedAlphabets, setSearchedAlphabets] = React.useState<string[]>(
    []
  );

  const handleInputChange = React.useCallback<TextFieldProps["onChange"]>(
    ({ currentTarget: { value } }) => {
      const firstLetter = (value as string).substr(0, 1).toLowerCase();
      // const isPreviouslySearched = some<string>((item) => item === firstLetter)(
      //   searchedAlphabets
      // );
      setQuery(value);
      if (Boolean(firstLetter))
        debounceGetAndSetLocationOptions(
          setLoading,
          setOptions,
          firstLetter,
          value
        );
      setSearchedAlphabets((prev) => [...prev, firstLetter]);
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

  // React.useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);

  return (
    <Box>
      <pre>{query}</pre>
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
            label="Asynchronous"
            onChange={handleInputChange}
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
    </Box>
  );
};

// // Top films as rated by IMDb users. http://www.imdb.com/chart/top
// const locations: RefinedCityStateCountryLocation[] = uniq([
//   {
//     id: 87504,
//     name: 'C',
//     state: 'Nebraska',
//     country: 'United States',
//     country_id: 488,
//     state_id: 89,
//     c_id: 1444,
//     c_name: 'Manhattan KS',
//     active: true,
//   },
//   {
//     id: 87504,
//     name: 'C',
//     state: 'Nebraska',
//     country: 'United States',
//     country_id: 488,
//     state_id: 89,
//     c_id: 1444,
//     c_name: 'Manhattan KS',
//     active: true,
//   },
//   {
//     id: 87504,
//     name: 'C',
//     state: 'Nebraska',
//     country: 'United States',
//     country_id: 488,
//     state_id: 89,
//     c_id: 1444,
//     c_name: 'Manhattan KS',
//     active: true,
//   },
//   {
//     id: 87504,
//     name: 'C',
//     state: 'Nebraska',
//     country: 'United States',
//     country_id: 488,
//     state_id: 89,
//     c_id: 1444,
//     c_name: 'Manhattan KS',
//     active: true,
//   },
//   {
//     id: 19256,
//     name: 'Caballo',
//     state: 'New Mexico',
//     country: 'United States',
//     country_id: 488,
//     state_id: 93,
//     c_id: 1439,
//     c_name: 'Santa Fe NM',
//     active: true,
//   },
//   {
//     id: 50297,
//     name: 'CABANAC',
//     state: 'HAUTES-PYRENEES',
//     country: 'France',
//     country_id: 329,
//     state_id: 4337,
//     c_id: 0,
//     c_name: '',
//     active: true,
//   },
//   {
//     id: 48136,
//     name: 'CABANAC CAZAUX',
//     state: 'HAUTE-GARONNE',
//     country: 'France',
//     country_id: 329,
//     state_id: 1908,
//     c_id: 0,
//     c_name: '',
//     active: true,
//   },
//   {
//     id: 47582,
//     name: 'CABANAC ET VILLAGRAINS',
//     state: 'GIRONDE',
//     country: 'France',
//     country_id: 329,
//     state_id: 1909,
//     c_id: 0,
//     c_name: '',
//     active: true,
//   },
//   {
//     id: 48137,
//     name: 'CABANAC SEGUENVILLE',
//     state: 'HAUTE-GARONNE',
//     country: 'France',
//     country_id: 329,
//     state_id: 1908,
//     c_id: 0,
//     c_name: '',
//     active: true,
//   },
//   // { title: 'The Shawshank Redemption', year: 1994 },
//   // { title: 'The Godfather', year: 1972 },
//   // { title: 'The Godfather: Part II', year: 1974 },
//   // { title: 'The Dark Knight', year: 2008 },
//   // { title: '12 Angry Men', year: 1957 },
//   // { title: "Schindler's List", year: 1993 },
//   // { title: 'Pulp Fiction', year: 1994 },
//   // {
//   //   title: 'The Lord of the Rings: The Return of the King',
//   //   year: 2003,
//   // },
//   // { title: 'The Good, the Bad and the Ugly', year: 1966 },
//   // { title: 'Fight Club', year: 1999 },
//   // {
//   //   title: 'The Lord of the Rings: The Fellowship of the Ring',
//   //   year: 2001,
//   // },
//   // {
//   //   title: 'Star Wars: Episode V - The Empire Strikes Back',
//   //   year: 1980,
//   // },
//   // { title: 'Forrest Gump', year: 1994 },
//   // { title: 'Inception', year: 2010 },
//   // {
//   //   title: 'The Lord of the Rings: The Two Towers',
//   //   year: 2002,
//   // },
//   // { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
//   // { title: 'Goodfellas', year: 1990 },
//   // { title: 'The Matrix', year: 1999 },
//   // { title: 'Seven Samurai', year: 1954 },
//   // {
//   //   title: 'Star Wars: Episode IV - A New Hope',
//   //   year: 1977,
//   // },
//   // { title: 'City of God', year: 2002 },
//   // { title: 'Se7en', year: 1995 },
//   // { title: 'The Silence of the Lambs', year: 1991 },
//   // { title: "It's a Wonderful Life", year: 1946 },
//   // { title: 'Life Is Beautiful', year: 1997 },
//   // { title: 'The Usual Suspects', year: 1995 },
//   // { title: 'Léon: The Professional', year: 1994 },
//   // { title: 'Spirited Away', year: 2001 },
//   // { title: 'Saving Private Ryan', year: 1998 },
//   // { title: 'Once Upon a Time in the West', year: 1968 },
//   // { title: 'American History X', year: 1998 },
//   // { title: 'Interstellar', year: 2014 },
// ]);
