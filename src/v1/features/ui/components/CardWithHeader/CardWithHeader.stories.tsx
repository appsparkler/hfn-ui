import type { Meta, StoryObj } from "@storybook/react";
import { CardWithHeader } from "./CardWithHeader";
// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction
const meta: Meta<typeof CardWithHeader> = {
  title: "features/ui/components/Card With Header",
  component: CardWithHeader,
  argTypes: {},
};
export default meta;
type Story = StoryObj<typeof CardWithHeader>;
// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const CardWithHeaderStory: Story = {
  args: {},
};
CardWithHeaderStory.storyName = "Card With Header";
