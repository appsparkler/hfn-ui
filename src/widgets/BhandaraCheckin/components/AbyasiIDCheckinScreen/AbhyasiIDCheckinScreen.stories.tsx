import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AbhyasiIDCheckinScreen } from "./AbhyasiIDCheckinScreen";

const Story = {
  component: AbhyasiIDCheckinScreen,
  title: "Widgets/Bhandara Checkin/Sections/AbhyasiIDCheckinScreen",
} as ComponentMeta<typeof AbhyasiIDCheckinScreen>;

const Template: ComponentStory<typeof AbhyasiIDCheckinScreen> = (args) => (
  <AbhyasiIDCheckinScreen {...args} />
);

export const abhyasiIdCheckinScreen: ComponentStory<
  typeof AbhyasiIDCheckinScreen
> = Template.bind({});
abhyasiIdCheckinScreen.args = {
  abhyasiId: "INSAAE769",
  batch: "batch-1",
};

export default Story;
