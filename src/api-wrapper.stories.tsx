import { useCallback } from "react";
import { fetchUserDetails } from "./widgets/BhandaraCheckin/mocked-apis/server-apis";

export default {
  title: "API Story",
};

const Template = () => {
  const onClickCallApi = useCallback(() => {
    fetchUserDetails("jifej2323")
      .then((res) => {
        alert(res.name);
      })
      .catch((e) => console.error("oops", e));
  }, []);
  return (
    <div>
      <button onClick={onClickCallApi} type="button">
        Call API
      </button>
    </div>
  );
};

export const apiStory = Template.bind({});
(apiStory as any).storyName = "API Story";
