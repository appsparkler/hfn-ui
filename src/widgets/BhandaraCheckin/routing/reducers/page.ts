import { createSlice } from "@reduxjs/toolkit";
import { NOT_FOUND } from "redux-first-router";
import { PageEnum } from "widgets/BhandaraCheckin/types";

const getInitialState = (): PageEnum => PageEnum.Home;

const pageSlice = createSlice({
  name: "page",
  initialState: getInitialState(),
  reducers: {
    HOME: () => PageEnum.Home,
    UPDATE_DETAILS: () => PageEnum.UpdateDetails,
    CHECKIN_SUCCESS: () => PageEnum.CheckInSuccess,
    [NOT_FOUND]: () => PageEnum.NotFound,
  },
});

export const { reducer: pageReducer, actions: pageActions } = pageSlice;
