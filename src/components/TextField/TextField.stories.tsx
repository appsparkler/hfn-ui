import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CustomTextField } from "./TextField";
import { action } from "@storybook/addon-actions";
import { CenterOfViewport } from "../CenterOfViewport";

export default {
  title: "Components/Form Controls/Custom Text Field",
  component: CustomTextField,
} as ComponentMeta<typeof CustomTextField>;

const Template: ComponentStory<typeof CustomTextField> = (args) => (
  <CenterOfViewport paddingX={10}>
    <CustomTextField {...args} />
  </CenterOfViewport>
);
export const customTextField = Template.bind({});
customTextField.args = {
  error: false,
  type: "text",
  variant: "filled",
  label: "First Name",
  value: "hello world",
  helperText: "This field is required",
  onChange: action("onChange"),
};
