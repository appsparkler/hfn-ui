import { ComponentMeta, ComponentStory } from "@storybook/react";
import { CheckinInfoTile } from "./CheckinInfoTile";
import { CheckinTypesEnum } from "widgets/BhandaraCheckin/types";

const Story = {
  component: CheckinInfoTile,
  title:
    "Widgets/Bhandara Checkin/Sections/Multi Checkin Screen/Checkin Info Tile",
} as ComponentMeta<typeof CheckinInfoTile>;

const Template: ComponentStory<typeof CheckinInfoTile> = (args) => {
  return (
    <CheckinInfoTile
      {...args}
      onCheck={args.onCheck}
      onChangeDormAllocation={args.onChangeDormAllocation}
    />
  );
};

export const checkinInfoTile: ComponentStory<typeof CheckinInfoTile> =
  Template.bind({});
checkinInfoTile.args = {
  type: CheckinTypesEnum.QR,
  abhyasiId: "tile-1",
  timestamp: Date.now(),
  checkin: true,
  batch: "batch-2",
  eventName: "2023 Birth Anniversary Celebrations of Pujya Daaji",
  pnr: "ABC-DEFH-HIJE",
  orderId: "Bhandara Sept 2023",
  fullName: "Jane Mathew",
  dormPreference: "East Comform Dorm - B1",
  berthPreference: "LB",
  regId: "AAV1234",
};

export default Story;
