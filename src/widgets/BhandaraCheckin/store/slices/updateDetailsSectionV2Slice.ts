import { createSlice } from "@reduxjs/toolkit";
import { isEmail, isMobile } from "utils";
import { ageGroupOptions, genderOptions } from "../../constants";
import { SectionUpdateDetailsStateProps } from "../../SectionUpdateDetailsV2/SectionUpdateDetailsV2";

const getInitialState = (): SectionUpdateDetailsStateProps => {
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

const updateDetailsSectionSlice = createSlice({
  name: "updateDetailsSectionSlice",
  initialState: getInitialState(),
  reducers: {
    reset: () => getInitialState(),
    // stopProcessing: (state) => {
    //   state.isProcessing = false;
    // },
    // startProcessing: (state) => {
    //   state.isProcessing = true;
    // },
    setState: (
      state,
      { payload }: { payload: Partial<SectionUpdateDetailsStateProps> }
    ) => ({
      ...state,
      ...payload,
    }),
    // setAgeOnFileOption: (state) => {
    //   state.ageGroupOptions = [...onFileOptions];
    // },
    setDefaultAgeOptions: (state) => {
      state.ageGroupOptions = { ...ageGroupOptions };
    },
    // setGenderOnFileOption: (state) => {
    //   state.genderOptions = { ...onFileOptions };
    // },
    setDefaultGenderOptions: (state) => {
      state.genderOptions = { ...genderOptions };
    },
    prepare: (state, { payload }: { payload: string }) => {
      const updateDetailsInitialState = getInitialState();
      return {
        ...updateDetailsInitialState,
        userDetails: {
          ...updateDetailsInitialState.userDetails,
          ...(isMobile(payload)
            ? {
                mobile: {
                  ...updateDetailsInitialState.userDetails.mobile,
                  disabled: true,
                  value: payload,
                },
              }
            : {}),
          ...(isEmail(payload)
            ? {
                email: {
                  ...updateDetailsInitialState.userDetails.email,
                  disabled: true,
                  value: payload,
                },
              }
            : {}),
        },
      };
    },
  },
});

export const {
  actions: updateDetailsV2Actions,
  reducer: updateDetailsV2Reducer,
  name: updateDetailsV2Name,
  getInitialState: getUpdateDetailsV2SectionInitialState,
} = updateDetailsSectionSlice;
