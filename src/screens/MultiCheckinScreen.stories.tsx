import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useCallback, useState } from "react";
import { MultiCheckinScreenProps } from "types";
import { MultiCheckinScreen } from "./MultiCheckinScreen";

const Story = {
  component: MultiCheckinScreen,
  title: "Screents/MultiCheckinScreen",
} as ComponentMeta<typeof MultiCheckinScreen>;

const Template: ComponentStory<typeof MultiCheckinScreen> = (args) => {
  const [$data, _setData] = useState<MultiCheckinScreenProps["data"]>(
    args.data
  );

  const handleChangeData = useCallback<MultiCheckinScreenProps["onChangeData"]>(
    (data) => {
      _setData(data);
      args.onChangeData(data);
    },
    [args]
  );

  return (
    <MultiCheckinScreen
      {...args}
      data={$data}
      onChangeData={handleChangeData}
    />
  );
};

export const multiCheckinScreen: ComponentStory<typeof MultiCheckinScreen> =
  Template.bind({});
multiCheckinScreen.args = {
  data: [
    {
      id: "tile-1",
      fullName: "Jane Mathew",
      dormPreference: "East Comform Dorm - B1",
      birthPreference: "LB",
      checked: false,
    },
    {
      id: "tile-2",
      fullName: "Shekhar Kapoor",
      dormPreference: "German Tent",
      birthPreference: "LB",
      checked: false,
    },
    {
      id: "tile-3",
      fullName: "Shekhar Kapoor",
      dormPreference: "German Tent",
      birthPreference: "LB",
      checked: false,
    },
  ],
};

export default Story;
