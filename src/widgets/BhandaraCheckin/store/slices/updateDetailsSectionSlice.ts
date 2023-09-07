import { createSlice } from "@reduxjs/toolkit";
import { isEmail, isMobile } from "utils";
import { ageGroupOptions, genderOptions } from "../../constants";
import { SectionUpdateDetailsStateProps } from "../../components/SectionUpdateDetails/SectionUpdateDetails";
import { Batch } from "widgets/BhandaraCheckin/types";

const getInitialState = (): SectionUpdateDetailsStateProps => {
  return {
    genderOptions,
    ageGroupOptions,
    batch: "batch-1",
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
      city: {
        show: true,
        value: "",
      },
      state: {
        show: true,
        value: "",
      },
      country: {
        show: true,
        value: "",
      },
      ageGroup: {
        show: true,
        value: "",
      },
      gender: {
        show: true,
        value: "",
      },
      dormAndBerthAllocation: {
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
    setState: (
      state,
      { payload }: { payload: Partial<SectionUpdateDetailsStateProps> }
    ) => ({
      ...state,
      ...payload,
    }),
    startProcessing: (state) => {
      state.isProcessing = true;
    },
    stopProcessing: (state) => {
      state.isProcessing = false;
    },
    setDefaultAgeOptions: (state) => {
      state.ageGroupOptions = { ...ageGroupOptions };
    },
    setBatch: (state, { payload }: { payload: Batch }) => {
      state.batch = payload;
    },
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
  actions: updateDetailsActions,
  reducer: updateDetailsReducer,
  name: updateDetailsV2Name,
  getInitialState: getUpdateDetailsSectionInitialState,
} = updateDetailsSectionSlice;
