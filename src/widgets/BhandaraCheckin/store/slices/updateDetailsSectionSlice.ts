import { createSlice } from "@reduxjs/toolkit";
import { ageGroupOptions, genderOptions, noFileOptions } from "../../constants";
import { onFileText } from "../../SectionMain/startCheckin/constants";
import { SectionUpdateDetailsStateProps } from "../../SectionUpdateDetails";

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
    setNoFileOption: (state) => {
      state.ageGroupOptions = [{ label: onFileText, value: onFileText }];
    },
    setDefaultAgeOptions: (state) => {
      state.ageGroupOptions = { ...ageGroupOptions };
    },
    setGenderNoFileOption: (state) => {
      state.genderOptions = { ...noFileOptions };
    },
    setDefaultGenderOptions: (state) => {
      state.genderOptions = { ...genderOptions };
    },
  },
});
