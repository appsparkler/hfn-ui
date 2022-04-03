import { CaseReducer, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { filter } from "lodash/fp";
import { Favourite } from "../../components/FavouriteList";

export type FavouriteState = { all: Favourite[]; checkedIn: string[] };

export const filterWithId = <T extends { id: string }>(idToFilter: string) =>
  filter<T>((i) => i.id !== idToFilter);

export const {
  actions: favouritesActions,
  reducer: favouritesReducer,
  name: favouritesName,
} = createSlice<
  FavouriteState,
  {
    add: CaseReducer<FavouriteState, PayloadAction<any>>;
    delete: CaseReducer<FavouriteState, PayloadAction<string>>;
    checkIn: CaseReducer<FavouriteState, PayloadAction<string>>;
  },
  "favourites"
>({
  name: "favourites",
  initialState: {
    all: [
      { abhyasiId: "INAAAE478", id: "1", name: "Prashant Mishra" },
      { abhyasiId: "INAAAE478", id: "2", name: "Nandini N" },
      { abhyasiId: "INAAAE478", id: "3", name: "Adithi Sharma" },
    ],
    checkedIn: [],
  },
  reducers: {
    add: (state, { payload }) => ({ ...state, all: [...state.all, payload] }),
    delete: (state, { payload }) => ({
      ...state,
      all: filterWithId<Favourite>(payload)(state.all),
    }),
    checkIn: (state, { payload }) => ({
      ...state,
      checkedIn: [...state.checkedIn, payload],
    }),
  },
});
