import type { ComponentMeta, ComponentStory } from "@storybook/react";
import { SuccessScreen } from "./SuccessScreen";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta = {
  title: "Widgets/GSM/features/Success Screen",
  component: SuccessScreen,
  argTypes: {},
} as ComponentMeta<typeof SuccessScreen>;
export default meta;
// type Story = StoryObj<typeof HomeScreen>;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const SuccessScreenStory: ComponentStory<typeof SuccessScreen> = (args) => (
  <SuccessScreen {...args} />
);
SuccessScreenStory.args = {
  
};

SuccessScreenStory.storyName = "Success Screen";
