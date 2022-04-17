import { createAsyncThunk } from "@reduxjs/toolkit";
import { find } from "lodash";
import { ThunkApiConfig } from "..";
import { SearchUserParams, SearchUserResponse, UserSRCM } from "../../types";

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
    const res = await dispatch(searchUser({ ref: abhyasiId }));
    const abhyasiData = find(
      (res.payload as SearchUserResponse).results,
      (user) => user.ref === abhyasiId
    );
    if (abhyasiData) {
      return abhyasiData;
    }
    return rejectWithValue(`Abhyasi with ID ${abhyasiId} not found`);
  }
);
