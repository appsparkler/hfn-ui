import { createSlice } from "@reduxjs/toolkit";
import { MultiCheckinScreenStateProps } from "widgets/BhandaraCheckin/types";

const getInitialState = (): MultiCheckinScreenStateProps => ({
  data: [],
});

export const multiCheckinScreenSlice = createSlice({
  name: "multiCheckinScreen",
  initialState: getInitialState(),
  reducers: {
    setData: (
      state,
      { payload }: { payload: MultiCheckinScreenStateProps["data"] }
    ) => {
      state.data = payload;
    },
  },
});
