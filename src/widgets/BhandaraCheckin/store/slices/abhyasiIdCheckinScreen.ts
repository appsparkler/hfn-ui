import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAbhyasiIDCheckinScreenStateProps } from "widgets/BhandaraCheckin/types";

const getInitialState = (): IAbhyasiIDCheckinScreenStateProps => ({
  abhyasiId: "",
  dormAndBirthAllocation: "",
});

const slice = createSlice({
  name: "abhyasiIdCheckinScreen",
  initialState: getInitialState(),
  reducers: {
    setDormAndBirthAllocation: (state, action: PayloadAction<string>) => {
      state.dormAndBirthAllocation = action.payload;
    },
  },
});

export const {
  actions: abhyasiIdCheckinScreenActions,
  reducer: abhyasiIdCheckinScreenReducer,
  name: abhyasiIdCheckinScreenName,
} = slice;
