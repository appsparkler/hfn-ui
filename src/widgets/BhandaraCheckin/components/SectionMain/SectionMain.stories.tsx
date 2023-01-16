import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SectionMain } from "./SectionMain";

export default {
  title: "Widgets/Bhandara Checkin/Sections/Main",
  component: SectionMain,
} as ComponentMeta<typeof SectionMain>;

const Template: ComponentStory<typeof SectionMain> = (args) => (
  <SectionMain {...args} />
);
export const main = Template.bind({});
main.args = {
  error: false,
  value: "INEEIW837",
  helperText: "For mobile, please use country code. For ex. +91868...",
  isProcessing: false,
  isDarkMode: false,
  isScannerOn: true,
  scanBtnDisabled: false,
  scanBtnProcessing: false,
  batches: [
    {
      label: "Batch 1",
      value: "batch-1",
    },
    {
      label: "Batch 2",
      value: "batch-2",
    },
    {
      label: "Both Batches",
      value: "both-batches",
    },
  ],
};
