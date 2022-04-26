import { map, some } from "lodash/fp";

export const mapToUpdatedCheckedItem = <
  T extends { checked?: boolean; id: string }
>(
  idToUpdate: string,
  checked: boolean
) =>
  map<T, T>((item) => (item.id === idToUpdate ? { ...item, checked } : item));

export const someAreCheckedAndNotDisabled = some<{
  checked?: boolean;
  disabled?: boolean;
}>((item) => Boolean(item.checked && !item.disabled));
