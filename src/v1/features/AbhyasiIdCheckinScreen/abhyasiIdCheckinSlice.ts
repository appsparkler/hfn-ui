import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { IAbhyasiIdCheckinScreenStateProps } from "./AbhyasiIdCheckinScreen";
import { event } from "v1/model/data/event";
import { RootState } from "v1/app/store";

const initialState: IAbhyasiIdCheckinScreenStateProps & {
  selectedBatch: string;
} = {
  abhyasiId: "",
  batchInitialValue: event.defaultBatch,
  selectedBatch: event.defaultBatch,
};

const abhyasiIdSlice = createSlice({
  name: "abhyasiIdSlice",
  initialState,
  reducers: {
    updatedSelectedBatch: (state, action: PayloadAction<string>) => {
      state.selectedBatch = action.payload;
    },
  },
});

export const {
  actions: abhyasiIdActions,
  reducer: abhyasiIdCheckinScreenReducer,
} = abhyasiIdSlice;

export const selectAbhyasiIdCheckinScreen = () => (state: RootState) =>
  state.abhyasiIdCheckinScreen;
