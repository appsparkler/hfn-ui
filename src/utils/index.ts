import map from "lodash/fp/map";
import find from "lodash/fp/find";
import some from "lodash/fp/some";
import { GenericCheckInVerboseValue } from "../components/GenericCheckInVerbose";

export const findById = <T extends { id: string }>(id: string) =>
  find<T>((fav) => fav.id === id);

export const mapToItemWithMatchingId = <T extends { id: string }>(item: T) =>
  map<T, T>(($item) => ($item.id === item.id ? { ...item } : item));

export const someStringsMatch = <T extends string>(itemToMatch: string) =>
  some<T>(($item) => $item === itemToMatch);

export const getDefaultUserInfo = (): GenericCheckInVerboseValue => ({
  ageGroup: { value: "", error: false, helperText: "" },
  email: { value: "", error: false, helperText: "" },
  fullName: { value: "", error: false, helperText: "" },
  gender: { value: "", error: false, helperText: "" },
  location: { value: undefined, error: false, helperText: "" },
});
