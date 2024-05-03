import { ComponentMeta, ComponentStory } from "@storybook/react";
import { BatchSelectField } from "./BatchSelectField";
import { event } from "v1/model/data/event";

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
  defaultValue: event.defaultBatch,
  batches: event.batches,
};
BatchSelectFieldStory.storyName = "Batch Select Field";

export default Story;
