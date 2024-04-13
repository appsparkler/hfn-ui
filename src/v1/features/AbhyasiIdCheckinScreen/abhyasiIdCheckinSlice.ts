import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "v1/app/store";
import { IAbhyasiIdCheckinAPIPayload } from "../../model/interfaces/api/IAbhyasiIdCheckinAPIPayload";

const initialState = {
  selectedBatch: "",
  dormAndBerthAllocation: "",
};

export const checkinWithAbhyasiId = createAsyncThunk(
  "abhyasiIdCheckinScreen/checkin",
  (abhyasiIdCheckin: IAbhyasiIdCheckinAPIPayload) => {
    debugger;
  }
);

const abhyasiIdSlice = createSlice({
  name: "abhyasiIdSlice",
  initialState,
  reducers: {
    updatedSelectedBatch: (state, action: PayloadAction<string>) => {
      state.selectedBatch = action.payload;
    },
    updateDormAndBerthAllocation: (state, action: PayloadAction<string>) => {
      state.dormAndBerthAllocation = action.payload;
    },
  },
});

export const {
  actions: abhyasiIdCheckinScreenActions,
  reducer: abhyasiIdCheckinScreenReducer,
} = abhyasiIdSlice;

export const selectAbhyasiIdCheckinScreen = (state: RootState) =>
  state.abhyasiIdCheckinScreen;
