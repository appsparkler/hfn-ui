import find from "lodash/fp/find";

export const findById = <T extends { id: string }>(id: string) =>
  find<T>((fav) => fav.id === id);
