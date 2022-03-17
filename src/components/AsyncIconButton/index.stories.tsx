import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AsyncIconButtonProps, AsyncIconButton } from "./index";
import Box from "@mui/material/Box";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Async Icon Button",
  component: AsyncIconButton,
} as ComponentMeta<typeof AsyncIconButton>;

const AsyncButtonTemplate: ComponentStory<typeof AsyncIconButton> = (args) => (
  <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
    <AsyncIconButton {...args} />
  </Box>
);

export const success = AsyncButtonTemplate.bind({});
success.args = {
  size: "small",
  onClick: (...args) => {
    action("onClick")(...args);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Yay! Success!");
      }, 600);
    });
  },
} as AsyncIconButtonProps;

export const failure = AsyncButtonTemplate.bind({});
failure.args = {
  size: "small",
  onClick: (...args) => {
    action("onClick")(...args);
    return new Promise((_resolve, reject) => {
      setTimeout(() => {
        reject(new Error("Oops! Not lookin' good"));
      }, 600);
    });
  },
} as AsyncIconButtonProps;
