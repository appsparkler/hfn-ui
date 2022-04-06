import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AsyncButton } from "./index";
import random from "lodash/fp/random";
import Box from "@mui/material/Box";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Async Button",
  component: AsyncButton,
} as ComponentMeta<typeof AsyncButton>;

const AsyncButtonTemplate: ComponentStory<typeof AsyncButton> = () => (
  <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
    <AsyncButton />
  </Box>
);
export const asyncButton = AsyncButtonTemplate.bind({});
asyncButton.args = {
  //   label: "Check In",
  //   onClick: () => {
  //     action("onClick")();
  //     return new Promise((resolve, reject) => {
  //       setTimeout(() => {
  //         if (random(1)(2) === 1) resolve("Yay! Success!");
  //         else reject(new Error("Oops! Not lookin' good"));
  //       }, 600);
  //     });
  //   },
  //   size: "small",
  //   variant: "contained",
};
