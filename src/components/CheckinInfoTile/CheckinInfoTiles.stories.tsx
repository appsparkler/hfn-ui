import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { useCallback } from "react";
import { ICheckinInfoTilesProps } from "types";
import { CheckinInfoTiles } from "./CheckinInfoTiles";

const Story = {
  component: CheckinInfoTiles,
  title: "components/Checkin Info Tiles",
} as ComponentMeta<typeof CheckinInfoTiles>;

const Template: ComponentStory<typeof CheckinInfoTiles> = (args) => {
  const [$data, setData] = React.useState<ICheckinInfoTilesProps["data"]>(
    args.data
  );
  const handleChange = useCallback<ICheckinInfoTilesProps["onChange"]>(
    (updatedData) => {
      setData(updatedData);
      args.onChange(updatedData);
    },
    [args]
  );
  return <CheckinInfoTiles data={$data} onChange={handleChange} />;
};

export const checkinInfoTiles: ComponentStory<typeof CheckinInfoTiles> =
  Template.bind({});
checkinInfoTiles.args = {
  data: [
    {
      id: "tile-1",
      checked: false,
      fullName: "Jane Mathew",
      dormPreference: "East Comform Dorm - B1",
      birthPreference: "LB",
    },
    {
      id: "tile-2",
      checked: false,
      fullName: "Shekhar Kapoor",
      dormPreference: "German Tent",
      birthPreference: "LB",
    },
    {
      id: "tile-3",
      checked: false,
      fullName: "Shekhar Kapoor",
      dormPreference: "German Tent",
      birthPreference: "LB",
    },
  ],
};

export default Story;
