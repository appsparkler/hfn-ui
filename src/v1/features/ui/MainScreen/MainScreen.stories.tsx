import type { Meta, StoryObj } from "@storybook/react";
import { MainScreen } from "./MainScreen";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MainScreen> = {
  title: "features/ui/Main Screen",
  component: MainScreen,
  argTypes: {},
};
export default meta;
type Story = StoryObj<typeof MainScreen>;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const MainScreenStory: Story = {
  args: {},
};
MainScreenStory.storyName = "Main Screen";
