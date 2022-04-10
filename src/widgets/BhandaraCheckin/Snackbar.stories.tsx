import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AppSnackbar } from "./Snackbar";

export default {
  title: "Components/App Snackbar",
  component: AppSnackbar,
} as ComponentMeta<typeof AppSnackbar>;

const Template: ComponentStory<typeof AppSnackbar> = (args) => (
  <AppSnackbar {...args} />
);
export const main = Template.bind({});
main.args = {
  children: "A snackbar 🍿🥟🍟🥨🥠",
  open: true,
  severity: "success",
  variant: "filled",
};
