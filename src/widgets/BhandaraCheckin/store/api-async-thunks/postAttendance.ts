import { createAsyncThunk } from "@reduxjs/toolkit";
import { PostAttendanceSuccess, PostAttendanceUser } from "../../types";
import { ThunkApiConfig } from "../index";

export enum PostAttendanceRejectReason {
  SERVER_ERROR,
  ALREADY_CHECKED_IN,
}

export const postAttendance = createAsyncThunk<
  PostAttendanceSuccess,
  PostAttendanceUser,
  ThunkApiConfig
>("api/post-attendance", async (user, { extra: { apis }, rejectWithValue }) => {
  try {
    const res = await apis.postAttendance(user);
    if (!(res as PostAttendanceSuccess).id) {
      return rejectWithValue(PostAttendanceRejectReason.ALREADY_CHECKED_IN);
    }
    return res as PostAttendanceSuccess;
  } catch (error) {
    return rejectWithValue(PostAttendanceRejectReason.SERVER_ERROR);
  }
});
