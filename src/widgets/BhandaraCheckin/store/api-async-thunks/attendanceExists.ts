import { createAsyncThunk } from "@reduxjs/toolkit";
import { ThunkApiConfig } from "..";
import { AttendanceExistsUser } from "../../types";

export enum AttendanceExistEnumType {
  USER_EXISTS,
  SERVER_ERROR,
}

export const attendanceExists = createAsyncThunk<
  boolean,
  AttendanceExistsUser,
  ThunkApiConfig
>(
  "apis/attendance-exists",
  async (user, { extra: { apis }, rejectWithValue }) => {
    try {
      const res = await apis.attendanceExists(user);
      if (res.attendance_exists === false) {
        return true;
      }
      if (res.attendance_exists === true) {
        return rejectWithValue(AttendanceExistEnumType.USER_EXISTS);
      }
      return rejectWithValue(AttendanceExistEnumType.SERVER_ERROR);
    } catch (error) {
      return rejectWithValue(AttendanceExistEnumType.SERVER_ERROR);
    }
  }
);

export const isCheckedinAbhyasi = createAsyncThunk<
  boolean,
  string,
  ThunkApiConfig
>(
  "apis/is-checked-in-abhyasi",
  async (abhyasiId, { rejectWithValue, dispatch }) => {
    const res = await dispatch(
      attendanceExists({ ref: abhyasiId.toUpperCase() })
    );
    if (res.meta.requestStatus === "rejected") {
      return rejectWithValue(res.payload);
    }
    return false;
  }
);
