import { uniq, pipe, map, find, filter } from "lodash/fp";

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
    return `${name}, ${state}, ${country}`;
  })(location),
}));

const findWithId = <T extends { id: number }>(id: number) =>
  find<T>((location) => id === location.id);

const findWithCityStateCountry = (cityStateCountryToFind: string) =>
  find<RefinedCityStateCountryLocation>(
    (item) => item.cityStateCountry === cityStateCountryToFind
  );

const removeItemsThatDonotstartWithQuery = (query: string) =>
  filter<CityStateCountryLocation>(
    (item) =>
      `${item.name}, ${item.state}, ${item.country}`
        .toLowerCase()
        .indexOf(query.toLowerCase()) > -1
  );

const filterOutItemsWithCityId0 = filter<RefinedCityStateCountryLocation>(
  (location) => location.c_id !== 0
);

export const getUniqLocations = (
  allLocations: CityStateCountryLocation[],
  query: string
) => {
  const refinedLocations = pipe<
    [CityStateCountryLocation[]],
    CityStateCountryLocation[],
    RefinedCityStateCountryLocation[]
  >(
    removeItemsThatDonotstartWithQuery(query),
    mapCityStateCountryLocationToRefined
  )(allLocations);

  mapCityStateCountryLocationToRefined(
    removeItemsThatDonotstartWithQuery(query)(allLocations)
  );
  return pipe<
    [RefinedCityStateCountryLocation[]],
    number[],
    number[],
    RefinedCityStateCountryLocation[],
    string[],
    string[],
    readonly RefinedCityStateCountryLocation[],
    readonly RefinedCityStateCountryLocation[]
  >(
    map((location) => location.id),
    uniq,
    map(
      (id) =>
        findWithId<RefinedCityStateCountryLocation>(id)(
          refinedLocations
        ) as RefinedCityStateCountryLocation
    ),
    map((location) => location.cityStateCountry),
    uniq,
    map(
      (cityStateCountry) =>
        findWithCityStateCountry(cityStateCountry)(
          refinedLocations
        ) as RefinedCityStateCountryLocation
    ),
    filterOutItemsWithCityId0
  )(refinedLocations);
};
