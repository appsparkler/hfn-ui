import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { locations, CityStateCountryLocation } from "./locations";
import { TextFieldProps } from "@mui/material";

const getApi = () => localStorage.getItem("cities-api");

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

export const LocationInputField = () => {
  const api = React.useMemo<string>(() => getApi(), []);

  const [loading, setLoading] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<
    readonly CityStateCountryLocation[]
  >([]);
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

  const handleInputChange = React.useCallback<TextFieldProps["onChange"]>(
    async ({ currentTarget: { value } }) => {
      try {
        setLoading(true);
        const firstLetter = (value as string).substr(0, 1).toLowerCase();
        const res = await fetch(`${api}/${firstLetter}.json`);
        console.log(res);
        const resJson = await res.json();
        console.log(resJson.length);
        setOptions(resJson.results);
      } catch (e) {
      } finally {
        setLoading(false);
      }
    },
    [api]
  );
  // React.useEffect(() => {
  //   if (!open) {
  //     setOptions([]);
  //   }
  // }, [open]);

  return (
    <Box>
      <Autocomplete
        id="asynchronous-demo"
        sx={{ width: 300 }}
        open={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        getOptionLabel={(option) => option.name}
        options={options}
        loading={loading}
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
// const locations: CityStateCountryLocation[] = uniq([
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
