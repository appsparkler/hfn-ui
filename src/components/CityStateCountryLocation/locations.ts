import { uniq, pipe, map, find, filter, remove } from "lodash/fp";

export type CityStateCountryLocation = {
  id: number;
  name: string;
  state: string;
  country: string;
  country_id: number;
  state_id: number;
  c_id: number;
  c_name: string;
  active: boolean;
};

export type RefinedCityStateCountryLocation = CityStateCountryLocation & {
  cityStateCountry: string;
};

const mapCityStateCountryLocationToRefined = map<
  CityStateCountryLocation,
  RefinedCityStateCountryLocation
>((location) => ({
  ...location,
  cityStateCountry: (({ name, country, state }: CityStateCountryLocation) => {
    return `${name}, ${country}, ${state}`;
  })(location),
}));

const findWithId = <T extends { id: number }>(id: number) =>
  find<T>((location) => id === location.id);

const findWithCityStateCountry = (cityStateCountryToFind: string) =>
  find<RefinedCityStateCountryLocation>(
    (item) => item.cityStateCountry === cityStateCountryToFind
  );

const removeWhichDoNotStartWithQuery = (query: string) =>
  remove<RefinedCityStateCountryLocation>(
    (item) => item.cityStateCountry.indexOf(query) > 0
  );

export const getUniqLocations = (
  allLocations: CityStateCountryLocation[],
  query: string
) => {
  const removeItemsThatDonotstartWithQuery = filter<CityStateCountryLocation>(
    (item) =>
      `${item.name}, ${item.state}, ${item.country}`
        .toLowerCase()
        .indexOf(query.toLowerCase()) === 0
  );

  const refinedLocations = mapCityStateCountryLocationToRefined(
    removeItemsThatDonotstartWithQuery(allLocations)
  );
  return pipe<
    [RefinedCityStateCountryLocation[]],
    number[],
    number[],
    RefinedCityStateCountryLocation[],
    string[],
    string[],
    // string[],
    readonly RefinedCityStateCountryLocation[]
  >(
    map((location) => location.id),
    uniq,
    map((id) =>
      findWithId<RefinedCityStateCountryLocation>(id)(refinedLocations)
    ),
    map((location) => location.cityStateCountry),
    uniq,
    // filter((item) => item.indexOf(queryString) === 0),
    map((cityStateCountry) =>
      findWithCityStateCountry(cityStateCountry)(refinedLocations)
    )
  )(refinedLocations);
};

const allLocations: CityStateCountryLocation[] = [
  {
    id: 87504,
    name: "C",
    state: "Nebraska",
    country: "United States",
    country_id: 488,
    state_id: 89,
    c_id: 1444,
    c_name: "Manhattan KS",
    active: true,
  },
  {
    id: 87504,
    name: "C",
    state: "Nebraska",
    country: "United States",
    country_id: 488,
    state_id: 89,
    c_id: 1444,
    c_name: "Manhattan KS",
    active: true,
  },
  {
    id: 87504,
    name: "C",
    state: "Nebraska",
    country: "United States",
    country_id: 488,
    state_id: 89,
    c_id: 1444,
    c_name: "Manhattan KS",
    active: true,
  },
  {
    id: 87504,
    name: "C",
    state: "Nebraska",
    country: "United States",
    country_id: 488,
    state_id: 89,
    c_id: 1444,
    c_name: "Manhattan KS",
    active: true,
  },
  {
    id: 19256,
    name: "Caballo",
    state: "New Mexico",
    country: "United States",
    country_id: 488,
    state_id: 93,
    c_id: 1439,
    c_name: "Santa Fe NM",
    active: true,
  },
  {
    id: 50297,
    name: "CABANAC",
    state: "HAUTES-PYRENEES",
    country: "France",
    country_id: 329,
    state_id: 4337,
    c_id: 0,
    c_name: "",
    active: true,
  },
  {
    id: 48136,
    name: "CABANAC CAZAUX",
    state: "HAUTE-GARONNE",
    country: "France",
    country_id: 329,
    state_id: 1908,
    c_id: 0,
    c_name: "",
    active: true,
  },
  {
    id: 47582,
    name: "CABANAC ET VILLAGRAINS",
    state: "GIRONDE",
    country: "France",
    country_id: 329,
    state_id: 1909,
    c_id: 0,
    c_name: "",
    active: true,
  },
  {
    id: 48137,
    name: "CABANAC SEGUENVILLE",
    state: "HAUTE-GARONNE",
    country: "France",
    country_id: 329,
    state_id: 1908,
    c_id: 0,
    c_name: "",
    active: true,
  },
];

// const refinedLocations = mapCityStateCountryLocationToRefined()

// export const locations = getUniqLocations(allLocations)(allLocations);
