import { useCallback, useState } from "react";
import { postAttendance, searchUser } from "./server-apis/index";
import { attendanceExists } from "./attendanceExitsts";

export const ApiExample = () => {
  const [response, setResponse] = useState<any>({});

  const handlePostAttendance = useCallback(async () => {
    const uuid = Date.now();
    const user = {
      name: String(uuid),
      // ref: `${uuid}`,
      ref: "B99999999",
      // ref: "INAAAE383",
      email: `${uuid}@mailinator.com`,
      mobile: `+91${uuid}`,
      // attendance_datetime: "",
      attendance_datetime: "",
      city_id: 195,
      age_group: "24",
      gender: "M",
    };
    // const user = {
    //   name: "Jody Wohlert",
    //   // ref: "INAAAE478",
    //   ref: "INAAAE480",
    //   // ref: undefined,
    //   email: "j********t@mailinator.com",
    //   mobile: "+91****50",
    //   age_group: "24",
    //   gender: "M",
    //   city_id: 144,
    //   // age_group: null,
    //   // gender: null,
    // };
    try {
      const res = await postAttendance(user);
      setResponse(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleSearchUser = useCallback(async () => {
    const res = await searchUser({
      // email: "appsparkler@gmail.com",
      // ref: "INAAAE",
      // mobile: "899",
      // name: "ANK",
      // year_of_joining: "1999",
      // mobile: "+917338080855",
      // gender: "M",
      // part_name: "Aakash Shah",
    });
    setResponse(res);
  }, []);

  const handleAttendanceExists = useCallback(async () => {
    const res = await attendanceExists({
      // part_name: "Aakash Shah",
      // email: "subs@appsparkler@gmail.com",
      // mobile: "+917338080855",
      ref: "INAAAE478",
      // email: undefined,
    });
    setResponse(res);
  }, []);

  return (
    <div>
      <div style={{ display: "flex", gap: 10 }}>
        <button type="button" onClick={handleSearchUser}>
          Search User
        </button>
        <button type="button" onClick={handlePostAttendance}>
          Post Attendance
        </button>
        <button type="button" onClick={handleAttendanceExists}>
          Attendance Exists
        </button>
      </div>
      <h4>Response:</h4>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
};
