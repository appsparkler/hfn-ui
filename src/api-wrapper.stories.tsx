import { useCallback, useState } from "react";
import {
  fetchUserDetails,
  isCheckedIn,
  postAttendance,
  attendanceExists,
  searchUser,
} from "./widgets/BhandaraCheckin/mocked-apis/server-apis";

export default {
  title: "Widgets/Bhandara Checkin/API Story",
};

const Template = () => {
  const [response, setResponse] = useState<any>({});
  const fetchAbhyasiData = useCallback(() => {
    fetchUserDetails("INAAAE479")
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.error("oops", e));
  }, []);

  const handleIsCheckedIn = useCallback(async () => {
    const res = await isCheckedIn({
      email: "appsparkler@gmail.com",
      mobile: "+917338080855",
      part_name: "Aakash Shah",
    });
    setResponse(res);
  }, []);

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
        <button onClick={fetchAbhyasiData} type="button">
          Fetch Abhyasi Data
        </button>
        <button type="button" onClick={handleIsCheckedIn}>
          Is Checked In
        </button>
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

export const apiStory = Template.bind({});
(apiStory as any).storyName = "API Story";
