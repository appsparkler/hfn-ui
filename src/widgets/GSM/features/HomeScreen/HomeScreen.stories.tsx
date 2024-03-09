import type { Meta, StoryObj } from "@storybook/react";
import { HomeScreen } from "./HomeScreen";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof HomeScreen> = {
  title: "Widgets/GSM/features/Home Screen",
  component: HomeScreen,
  argTypes: {},
};
export default meta;
type Story = StoryObj<typeof HomeScreen>;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const HomeScreenStory: Story = {
  args: {
    
  },
};
HomeScreenStory.storyName = "Home Screen"