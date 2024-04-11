import { ComponentMeta, ComponentStory } from "@storybook/react";
import { AbhyasiIdCheckinScreen } from "./AbhyasiIdCheckinScreen";

const Story = {
  component: AbhyasiIdCheckinScreen,
  title: "features/ui/Abhyasi Id Checkin Screen",
} as ComponentMeta<typeof AbhyasiIdCheckinScreen>;

const Template: ComponentStory<typeof AbhyasiIdCheckinScreen> = (args) => (
  <AbhyasiIdCheckinScreen {...args} />
);

export const AbhyasiIdCheckinScreenStory: ComponentStory<
  typeof AbhyasiIdCheckinScreen
> = Template.bind({});
AbhyasiIdCheckinScreenStory.args = {};
AbhyasiIdCheckinScreenStory.storyName = "Abhyasi Id Checkin Screen";

export default Story;
