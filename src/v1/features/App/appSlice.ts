import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "v1/app/store";
import { getAnonymousUser } from "v1/model/apiService";

const initialState = {
  user: {
    uid: "",
  },
  status: "pending",
};

export const signInAnonymously = createAsyncThunk("app/signIn", async () => {
  const user = await getAnonymousUser();
  return user;
});

const appSlice = createSlice({
  name: "appSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInAnonymously.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(signInAnonymously.fulfilled, (state, action) => {
        state.user = action.payload;
        state.status = "fulfilled";
      })
      .addCase(signInAnonymously.rejected, (state, action) => {
        state.status = "rejected";
      });
  },
});

export const { actions: appActions, reducer: appReducer } = appSlice;

export const selectAppReducer = (state: RootState) => state.app;
