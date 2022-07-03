import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "..";
import { SearchUserParams, SearchUserResponse, UserSRCM } from "../../types";
import { errorAbhyasiNotFound } from "../../utils";

export const searchUser = createAsyncThunk<
  SearchUserResponse,
  SearchUserParams,
  ThunkApiConfig
>("apis/search-user", async (user, { extra: { apis }, rejectWithValue }) => {
  try {
    const res = await apis.searchUser(user);
    return res;
  } catch (error) {
    return rejectWithValue("Server Error! Please try again in some time.");
  }
});

export const searchAbhyasi = createAsyncThunk<UserSRCM, string, ThunkApiConfig>(
  "apis/search-abhyasi",
  async (abhyasiId, { rejectWithValue, dispatch }) => {
    const res = await dispatch(searchUser({ ref: abhyasiId.toUpperCase() }));
    if ((res.payload as SearchUserResponse).count === 1) {
      return (res.payload as SearchUserResponse).results[0];
    }
    return rejectWithValue(errorAbhyasiNotFound(abhyasiId));
  }
);
