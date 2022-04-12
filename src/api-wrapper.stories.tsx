import { useCallback } from "react";
import { fetchUserDetails } from "./widgets/BhandaraCheckin/mocked-apis/server-apis";

export default {
  title: "API Story",
};

export const Template = () => {
  const onClickCallApi = useCallback(() => {
    fetchUserDetails("INAAAE478")
      .then((res) => {
        alert(res.name);
      })
      .catch(console.error);
  }, []);
  return (
    <div>
      Test API
      <button onClick={onClickCallApi} type="button">
        Call API
      </button>
    </div>
  );
};

export const apiStory = Template.bind({});
(apiStory as any).storyName = "API Story";
