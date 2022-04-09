import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BhandaraCheckinAPIs } from "..";
import { CurrentSectionEnum } from "../../types";

export const bhandaraCheckinSlice = createSlice({
  name: "bhandara-checkin",
  initialState: {
    currentSection: CurrentSectionEnum.MAIN,
    registeringWithValue: "abc@gmail.com",
    isProcessing: false,
    helperText: "",
  },
  reducers: {
    goToUpdateDetails: (state) => {
      state.currentSection = CurrentSectionEnum.UPDATE_DETAILS;
    },
    goToMain: (state) => {
      state.currentSection = CurrentSectionEnum.MAIN;
    },
    goToCheckinSuccess: (state) => {
      state.currentSection = CurrentSectionEnum.CHECKIN_SUCCESS;
    },
    changeRegisteringWithValue: (state, { payload }) => {
      state.registeringWithValue = payload;
    },
    setHelperText: (state, { payload }) => {
      state.helperText = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(someAction.pending, (state) => {
      state.isProcessing = true;
    });
    builder.addCase(someAction.fulfilled, (state, action) => {
      state.isProcessing = false;
    });
  },
});

export type ThunkApiConfig = {
  extra: {
    apis: BhandaraCheckinAPIs;
  };
};

export const someAction = createAsyncThunk<void, string, ThunkApiConfig>(
  "bhandara-checkin/someAction",
  async (userId, thunkAPI) => {
    const isUserCheckedIn = await thunkAPI.extra.apis.getIsUserCheckedIn(
      userId
    );
    if (isUserCheckedIn) {
      bhandaraCheckinSlice.actions.setHelperText(
        `Abhyasi with ID ${userId} is already checkedin`
      );
    } else {
      const userDetails = await thunkAPI.extra.apis.getUserDetails(userId);
      thunkAPI.dispatch(bhandaraCheckinSlice.actions.goToUpdateDetails());
    }
  }
);
