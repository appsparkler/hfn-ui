import { FormControlLabelProps } from "@mui/material";
import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useCallback } from "react";
import { CheckinInfoTile } from "./CheckinInfoTile";

const Story = {
  component: CheckinInfoTile,
  title: "Components/Checkin Info Tile",
} as ComponentMeta<typeof CheckinInfoTile>;

const Template: ComponentStory<typeof CheckinInfoTile> = (args) => {
  type TextFieldOnChangeHandler = NonNullable<
    FormControlLabelProps["onChange"]
  >;

  const handleChange = useCallback<TextFieldOnChangeHandler>(
    (event, checked) => {
      console.log(checked);
    },
    []
  );

  return <CheckinInfoTile {...args} onCheck={handleChange} />;
};

export const checkinInfoTile: ComponentStory<typeof CheckinInfoTile> =
  Template.bind({});
checkinInfoTile.args = {
  fullName: "Shekhar Kapoor",
  id: "tile-1",
  birthPreference: "LB",
  dormPreference: "East Comform Dorm - B1",
};

export default Story;
