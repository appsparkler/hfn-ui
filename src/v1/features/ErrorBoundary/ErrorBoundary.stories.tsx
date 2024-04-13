import { ComponentMeta, ComponentStory } from "@storybook/react";
import { ErrorBoundary } from "./ErrorBoundary";

const Story = {
  component: ErrorBoundary,
  title: "features/ErrorBoundary",
} as ComponentMeta<typeof ErrorBoundary>;

const Template: ComponentStory<typeof ErrorBoundary> = (args) => (
  <ErrorBoundary {...args} />
);

export const ErrorBoundaryStory: ComponentStory<typeof ErrorBoundary> =
  Template.bind({});
ErrorBoundaryStory.args = {};

export default Story;
