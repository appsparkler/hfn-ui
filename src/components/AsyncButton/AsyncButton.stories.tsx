import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AsyncButton } from "./AsyncButton";

export default {
  title: "Components/CTA/Async Button",
  component: AsyncButton,
} as ComponentMeta<typeof AsyncButton>;

const Template: ComponentStory<typeof AsyncButton> = (args) => (
  <AsyncButton {...args} />
);
export const asyncButton = Template.bind({});
asyncButton.args = {
  isProcessing: false,
  disabled: false,
  label: "CHECK IN",
  size: "large",
  variant: "contained",
  color: "success",
};
