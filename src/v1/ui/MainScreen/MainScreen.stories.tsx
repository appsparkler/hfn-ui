import type { ComponentStory, Meta } from "@storybook/react";
import { MainScreen } from "./MainScreen";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof MainScreen> = {
  title: "features/ui/Main Screen",
  component: MainScreen,
  argTypes: {},
};
export default meta;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const MainScreenStory: ComponentStory<typeof MainScreen> = (args) => (
  <MainScreen {...args} />
);
MainScreenStory.storyName = "Main Screen";
MainScreenStory.args = {
  eventTitle: "125th Birth Anniversary of Pujya Babuji Maharaj - 2024",
  defaultBatchValue: "batch-1",
};
