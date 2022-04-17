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
    // const user = {
    //   // id: 37614,
    //   name: "Thaddeus Fumagalli",
    //   ref: Date.now().toString(),
    //   record_type: "a",
    //   city_id: null,
    //   email: `${Date.now()}@malinator.com`,
    //   mobile: `+${Date.now()}`,
    //   location: "123",
    //   // firebase_uid: null,
    //   gender: "M",
    //   // year_of_joining: "1990",
    //   ageGroup: "70-75",
    // };
    const user = {
      name: "1650177042",
      // ref: "B99999993",
      // ref: null,
      email: "1650177092@mailinator.com",
      mobile: "911650177092",
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
    // const res = await checkinUserAPI({
    //   ageGroup: "10-19",
    //   // email: "appsparkler@gmail.com",
    //   fullName: "Aakash Shah",
    //   gender: "male",
    //   location: "123",
    //   mobile: "+917338080855",
    //   abhyasiId: "INAAAE393",
    // });
    // const res = await checkinUser(user);
    // console.log(res);
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
