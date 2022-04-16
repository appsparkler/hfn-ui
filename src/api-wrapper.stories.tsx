import { useCallback } from "react";
import { fetchUserDetails } from "./widgets/BhandaraCheckin/mocked-apis/server-apis";
import { checkinUser as checkinUserAPI } from "./widgets/BhandaraCheckin/mocked-apis/server-apis";

export default {
  title: "API Story",
};

const Template = () => {
  const fetchAbhyasiData = useCallback(() => {
    fetchUserDetails("jifej2323")
      .then((res) => {
        alert(res.name);
      })
      .catch((e) => console.error("oops", e));
  }, []);

  const checkinUser = useCallback(async () => {
    const res = await checkinUserAPI({
      ageGroup: "10-19",
      // email: "appsparkler@gmail.com",
      fullName: "Aakash Shah",
      gender: "male",
      location: "123",
      mobile: "+917338080855",
      abhyasiId: "INAAAE393",
    });
    console.log(res);
  }, []);
  return (
    <div>
      <button onClick={fetchAbhyasiData} type="button">
        Fetch Abhyasi Data
      </button>
      <button type="button" onClick={checkinUser}>
        Checkin User
      </button>
    </div>
  );
};

export const apiStory = Template.bind({});
(apiStory as any).storyName = "API Story";
