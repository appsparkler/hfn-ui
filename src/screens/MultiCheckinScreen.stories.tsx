import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useCallback, useState } from "react";
import { MultiCheckinScreenProps } from "types";
import { MultiCheckinScreen } from "./MultiCheckinScreen";

const Story = {
  component: MultiCheckinScreen,
  title: "Screents/MultiCheckinScreen",
} as ComponentMeta<typeof MultiCheckinScreen>;

const Template: ComponentStory<typeof MultiCheckinScreen> = (args) => {
  const [$data, setData] = useState<MultiCheckinScreenProps["data"]>(args.data);
  const handleCheckin = useCallback<MultiCheckinScreenProps["onClickCheckin"]>(
    (...args2) => {
      console.log("Checkin");
      // args.onClickCheckin(...args2);
      args.onClickCheckin(args.data);
    },
    [args]
  );

  return (
    <MultiCheckinScreen {...args} data={$data} onClickCheckin={handleCheckin} />
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
    },
    {
      id: "tile-2",
      fullName: "Shekhar Kapoor",
      dormPreference: "German Tent",
      birthPreference: "LB",
    },
    {
      id: "tile-3",
      fullName: "Shekhar Kapoor",
      dormPreference: "German Tent",
      birthPreference: "LB",
    },
  ],
};

export default Story;
