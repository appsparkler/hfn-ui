import map from "lodash/fp/map";
import find from "lodash/fp/find";
import some from "lodash/fp/some";

export const findById = <T extends { id: string }>(id: string) =>
  find<T>((fav) => fav.id === id);

export const mapToItemWithMatchingId = <T extends { id: string }>(item: T) =>
  map<T, T>(($item) => ($item.id === item.id ? { ...item } : item));

export const someStringsMatch = <T extends string>(itemToMatch: string) =>
  some<T>(($item) => $item === itemToMatch);
