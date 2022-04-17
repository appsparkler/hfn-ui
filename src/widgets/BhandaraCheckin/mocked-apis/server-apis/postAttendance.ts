import { fetchWithToken } from "../init";

export type PostAttendanceSuccess = {
  id: number;
  attendance_datetime: string;
  registration: {
    age_group: string;
    arrival_date: null;
    cancelled: null;
    city_id: number;
    communication_preference: number;
    create_date: string;
    created_by_user: null;
    departure_date: null;
    email: string;
    emergency_contact: null;
    emergency_mobile: null;
    emergency_relation: null;
    gender: null;
    has_registered: boolean;
    id: number;
    audit_log: never[];
    mobile: string;
    name: string;
    partner_id: null;
    ref: string;
    reg_json: {};
    status: string;
    stay_preference: null;
    write_date: string;
    reg_header: number;
    event_name: string;
    event_title: string;
    pnr: string;
  };
  session: {
    id: number;
    event: number;
    create_date: string;
    write_date: string;
    audit_log: never[];
    name: string;
    session_no: number;
    start_datetime: string;
    end_datetime: null;
  };
};

export type PostAttendanceUser = {
  name: string;
  ref?: string | null;
  email: string | null;
  mobile: string | null;
  attendance_datetime?: string;
  city_id: number | null;
  age_group: string | null;
  gender: string | null;
};

export type PostAttendanceFailure = {
  detail: ["Attendance already exists."];
};

export const postAttendance = (
  user: PostAttendanceUser
): Promise<PostAttendanceSuccess | PostAttendanceFailure> => {
  const raw = JSON.stringify(user);
  const requestOptions = {
    method: "POST",
    body: raw,
  };

  return fetchWithToken(
    "https://profile.srcm.net/api/v3/events/0317dc43-15f3-434e-8ee9-ad1aa7f61cf6/attendance/",
    requestOptions
  );
};
