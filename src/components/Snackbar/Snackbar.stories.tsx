import { ComponentMeta, ComponentStory } from "@storybook/react";
import { Snackbar } from "./Snackbar";

export default {
  title: "Components/Feedback/Snackbar",
  component: Snackbar,
} as ComponentMeta<typeof Snackbar>;

const Template: ComponentStory<typeof Snackbar> = (args) => (
  <Snackbar {...args} />
);
export const snackbar = Template.bind({});
snackbar.args = {
  vertical: "top",
  horizontal: "center",
  children: "A snackbar 🍿🥟🍟🥨🥠",
  open: true,
  severity: "success",
  variant: "filled",
  autoHideDuration: 5000
};
