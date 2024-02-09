import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Batch,
  IAbhyasiIDCheckinScreenStateProps,
} from "widgets/BhandaraCheckin/types";

const getInitialState = (): IAbhyasiIDCheckinScreenStateProps => ({
  abhyasiId: "",
  dormAndBerthAllocation: "",
  batch: "batch-2",
});

const slice = createSlice({
  name: "abhyasiIdCheckinScreen",
  initialState: getInitialState(),
  reducers: {
    setAbhyasiId: (state, action: PayloadAction<string>) => {
      state.abhyasiId = action.payload;
    },
    setBatch: (state, action: PayloadAction<Batch>) => {
      state.batch = action.payload;
    },
    setDormAndBerthAllocation: (state, action: PayloadAction<string>) => {
      state.dormAndBerthAllocation = action.payload;
    },
  },
});

export const {
  actions: abhyasiIdCheckinScreenActions,
  reducer: abhyasiIdCheckinScreenReducer,
  name: abhyasiIdCheckinScreenName,
} = slice;
