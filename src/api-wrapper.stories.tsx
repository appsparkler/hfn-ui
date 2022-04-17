import { useCallback } from "react";
import { postAttendance } from "./widgets/BhandaraCheckin/mocked-apis/postAttendance";
import {
  fetchUserDetails,
  isCheckedIn,
  checkinUser,
} from "./widgets/BhandaraCheckin/mocked-apis/server-apis";

export default {
  title: "API Story",
};

const Template = () => {
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
      console.log(res);
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
    console.log(res);
  }, []);
  return (
    <div style={{ display: "flex", gap: 10 }}>
      <button onClick={fetchAbhyasiData} type="button">
        Fetch Abhyasi Data
      </button>
      <button type="button" onClick={handleCheckinUser}>
        Checkin User
      </button>
      <button type="button" onClick={handleIsCheckedIn}>
        Is Checked In
      </button>
    </div>
  );
};

export const apiStory = Template.bind({});
(apiStory as any).storyName = "API Story";
