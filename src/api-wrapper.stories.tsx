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

  const handleCheckinUser = useCallback(async () => {
    const user = {
      name: "1650177011",
      ref: undefined,
      email: "1650177011@mailinator.com",
      mobile: "1650177011",
      attendance_datetime: "",
      city_id: 195,
      age_group: "24",
      gender: "M",
    };
    try {
      const res = await postAttendance(user);
      // if ((res as typeof sam).id) {

      // }
      setResponse(res);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleIsCheckedIn = useCallback(async () => {
    const res = await isCheckedIn({
      email: "appsparkler@gmail.com",
      mobile: "+917338080855",
      part_name: "Aakash Shah",
    });
    setResponse(res);
  }, []);

  const handleSearchUser = useCallback(async () => {
    const res = await searchUser({
      email: "appsparkler@gmail.com",
      // mobile: "+917338080855",
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
        <button type="button" onClick={handleCheckinUser}>
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
