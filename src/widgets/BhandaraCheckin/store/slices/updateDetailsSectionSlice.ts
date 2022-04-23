import { createSlice } from "@reduxjs/toolkit";
import { ageGroupOptions, genderOptions, onFileOptions } from "../../constants";
import { SectionUpdateDetailsStateProps } from "../../SectionUpdateDetails/SectionUpdateDetails";

export const getUpdateDetailsSectionInitialState =
  (): SectionUpdateDetailsStateProps => {
    return {
      genderOptions,
      ageGroupOptions,
      userDetails: {
        fullName: {
          show: true,
          value: "",
        },
        mobile: {
          show: true,
          value: "",
        },
        email: {
          show: true,
          value: "",
        },
        location: {
          show: true,
        },
        ageGroup: {
          show: true,
          value: "",
        },
        gender: {
          show: true,
          value: "",
        },
      },
    };
  };

export const updateDetailsSectionSlice = createSlice({
  name: "updateDetailsSectionSlice",
  initialState: getUpdateDetailsSectionInitialState(),
  reducers: {
    reset: () => getUpdateDetailsSectionInitialState(),
    stopProcessing: (state) => {
      state.isProcessing = false;
    },
    startProcessing: (state) => {
      state.isProcessing = true;
    },
    setState: (
      state,
      { payload }: { payload: Partial<SectionUpdateDetailsStateProps> }
    ) => ({
      ...state,
      ...payload,
    }),
    setAgeOnFileOption: (state) => {
      state.ageGroupOptions = [...onFileOptions];
    },
    setDefaultAgeOptions: (state) => {
      state.ageGroupOptions = { ...ageGroupOptions };
    },
    setGenderOnFileOption: (state) => {
      state.genderOptions = { ...onFileOptions };
    },
    setDefaultGenderOptions: (state) => {
      state.genderOptions = { ...genderOptions };
    },
  },
});

export const {
  actions: updateDetailsActions,
  reducer: updateDetailsReducer,
  name: updateDetailsName,
} = updateDetailsSectionSlice;
