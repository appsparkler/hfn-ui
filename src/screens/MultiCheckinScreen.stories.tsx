import { ComponentMeta, ComponentStory } from "@storybook/react";
import { MultiCheckinScreen } from "./MultiCheckinScreen";

const Story = {
  component: MultiCheckinScreen,
  title: "Screents/MultiCheckinScreen",
} as ComponentMeta<typeof MultiCheckinScreen>;

const Template: ComponentStory<typeof MultiCheckinScreen> = (args) => (
  <MultiCheckinScreen {...args} />
);

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
