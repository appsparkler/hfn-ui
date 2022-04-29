import { ComponentStory, ComponentMeta } from "@storybook/react";
import { TimedConfetti } from "./TimedConfetti";

export default {
  title: "Components/Awesome/Confetti",
  component: TimedConfetti,
} as ComponentMeta<typeof TimedConfetti>;

const Template: ComponentStory<typeof TimedConfetti> = (args) => (
  <TimedConfetti {...args} />
);

export const confetti = Template.bind({});
confetti.args = {
  ms: 100000,
  numberOfPieces: 500,
};
