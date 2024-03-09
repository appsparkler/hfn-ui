import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { HomeScreen } from "./HomeScreen";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Widgets/GSM/features/Home Screen",
  component: HomeScreen,
  argTypes: {},
} as ComponentMeta<typeof HomeScreen>;
export default meta;
// type Story = StoryObj<typeof HomeScreen>;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const HomeScreenStory: ComponentStory<typeof HomeScreen> = (args) => (
  <HomeScreen {...args} />
);
HomeScreenStory.args = {
  user: {
    name: "Abdul Rehman",
    mobileNo: "0300-1234567",
    checkinTime: Date.now(),
    email: "XV7pT@example.com",
    organization: "Global Spirituality Mahotsav",
    platform: "WEB",
    uid: "1234-user",
  },
  checkinButtonDisabled: false,
};

HomeScreenStory.storyName = "Home Screen";
