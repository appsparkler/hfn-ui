import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimedConfetti } from "./TimedConfetti";

export default {
  title: "Components/Awesome/Confetti",
  component: TimedConfetti,
} as ComponentMeta<typeof TimedConfetti>;

const Template: ComponentStory<typeof TimedConfetti> = () => <TimedConfetti />;
export const asyncButton = Template.bind({});
asyncButton.args = {
  ms: 100000,
};
