import type { Meta, StoryObj } from "@storybook/react";
import { SuccessScreen } from "./SuccessScreen";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof SuccessScreen> = {
  title: "features/ui/Success Screen",
  component: SuccessScreen,
  argTypes: {
    
  },
};
export default meta;
type Story = StoryObj<typeof SuccessScreen>;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SuccessScreenStory: Story = {
  args: {
    
  },
};
SuccessScreenStory.storyName = "Success Screen"