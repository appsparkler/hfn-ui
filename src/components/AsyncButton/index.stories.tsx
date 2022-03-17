import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AsyncButton, AsyncButtonProps } from "./index";
import random from "lodash/fp/random";
import Box from "@mui/material/Box";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Async Button",
  component: AsyncButton,
} as ComponentMeta<typeof AsyncButton>;

const AsyncButtonTemplate: ComponentStory<typeof AsyncButton> = (args) => (
  <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
    <AsyncButton {...args} />
  </Box>
);

export const asyncButton = AsyncButtonTemplate.bind({});
asyncButton.args = {
  label: "Check In",
  onClick: (...args) => {
    action("onClick")(...args);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (random(1)(2) === 1) resolve("success");
        else reject();
      }, 600);
    });
  },
  size: "small",
  variant: "contained",
  successMessage: "Prakash is checked in",
  errorMessage: "Prakash Mishra not checked in",
} as AsyncButtonProps;
