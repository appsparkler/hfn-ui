import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "..";
import { AttendanceExistsUser } from "../../types";

export const attendanceExists = createAsyncThunk<
  boolean,
  AttendanceExistsUser,
  ThunkApiConfig
>(
  "apis/attendance-exists",
  async (user, { extra: { apis }, rejectWithValue }) => {
    try {
      const res = await apis.attendanceExists(user);
      if (res.attendance_exists)
        return rejectWithValue("User has already checked in.");
      return res.attendance_exists;
    } catch (error) {
      return rejectWithValue("Server Error!  Please try again in some time.");
    }
  }
);
