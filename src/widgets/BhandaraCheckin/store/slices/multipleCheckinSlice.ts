import { createSlice } from "@reduxjs/toolkit";
import {
  CheckboxItem,
  SectionMultiCheckinStateProps,
} from "../../SectionMultipleCheckin/SectionMultipleCheckin";

const getInitialState = (): SectionMultiCheckinStateProps => {
  return {
    items: [],
  };
};

const multipleCheckinSlice = createSlice({
  name: "bhandara-checkin",
  initialState: getInitialState(),
  reducers: {
    setItems: (state, { payload }: { payload: CheckboxItem[] }) => {
      state.items = payload;
    },
  },
});

export const {
  actions: multipleCheckinActions,
  getInitialState: getMultipleCheckinInitialState,
  name: multipleCheckinName,
  reducer: multipleCheckinReducer,
} = multipleCheckinSlice;
