import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BhandaraCheckinAPIs } from "..";
import { CurrentSectionEnum, UserDetails } from "../../types";

export type InitialState = {
  currentSection: CurrentSectionEnum;
  registeringWithValue: string;
  isProcessing: boolean;
  helperText: string;
  userDetails: UserDetails;
};

export const getInitialState = (): InitialState => {
  return {
    currentSection: CurrentSectionEnum.MAIN,
    registeringWithValue: "abc@gmail.com",
    isProcessing: false,
    helperText: "",
    userDetails: {
      fullName: {
        value: "Priyanka Patel",
        show: true,
      },
      mobile: {
        value: "+91339282838",
        show: true,
      },
      email: {
        value: "priyanka.patel@gmail.com",
        show: true,
      },
      location: {
        value: {
          id: 84770,
          name: "Bacita",
          state: "Kwara",
          country: "Nigeria",
          country_id: 417,
          state_id: 3107,
          c_id: 0,
          c_name: "",
          active: true,
          cityStateCountry: "Bacita, Kwara, Nigeria",
        },
        show: true,
      },
      ageGroup: {
        value: "0-10",
        show: true,
      },
      gender: {
        value: "female",
        show: true,
      },
    },
  };
};

export const bhandaraCheckinSlice = createSlice({
  name: "bhandara-checkin",
  initialState: getInitialState(),
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
