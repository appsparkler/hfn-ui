import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BatchSelectField } from "./BatchSelectField";

const Story = {
  component: BatchSelectField,
  title: "features/ui/components/Batch Select Field",
} as ComponentMeta<typeof BatchSelectField>;

const Template: ComponentStory<typeof BatchSelectField> = (args) => (
  <BatchSelectField {...args} />
);

export const BatchSelectFieldStory: ComponentStory<typeof BatchSelectField> =
  Template.bind({});
BatchSelectFieldStory.args = {
  defaultValue: "batch-1",
};
BatchSelectFieldStory.storyName = "Batch Select Field";

export default Story;
