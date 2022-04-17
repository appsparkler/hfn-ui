import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostAttendanceSuccess, PostAttendanceUser } from "../../types";
import { ThunkApiConfig } from "../index";
import { serverError } from "../utils";

export const postAttendance = createAsyncThunk<
  PostAttendanceSuccess,
  PostAttendanceUser,
  ThunkApiConfig
>("api/post-attendance", async (user, { extra: { apis }, rejectWithValue }) => {
  try {
    const res = await apis.postAttendance(user);
    if (Array.isArray(res)) {
      return rejectWithValue("User has already checked in.");
    }
    return res as PostAttendanceSuccess;
  } catch (error) {
    return rejectWithValue(serverError());
  }
});
