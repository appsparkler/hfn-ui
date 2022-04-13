import { createSlice } from "@reduxjs/toolkit";
import { SectionUpdateDetailsStateProps } from "../../SectionUpdateDetails";

export const getUpdateDetailsSectionInitialState =
  (): SectionUpdateDetailsStateProps => {
    return {
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
    setState: (
      state,
      { payload }: { payload: Partial<SectionUpdateDetailsStateProps> }
    ) => ({
      ...state,
      ...payload,
    }),
  },
});
