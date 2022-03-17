import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CircularInegrationProps, CircularIntegration } from "./index";
import random from "lodash/fp/random";
import Box from "@mui/material/Box";
import { action } from "@storybook/addon-actions";

export default {
  title: "Components/Async Icon Button",
  component: CircularIntegration,
} as ComponentMeta<typeof CircularIntegration>;

const AsyncButtonTemplate: ComponentStory<typeof CircularIntegration> = (
  args
) => (
  <Box sx={{ display: "flex", justifyContent: "center", marginY: 5 }}>
    <CircularIntegration {...args} />
  </Box>
);

export const asyncIconButton = AsyncButtonTemplate.bind({});
asyncIconButton.args = {
  size: "small",
  onClick: (...args) => {
    action("onClick")(...args);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (random(1)(2) === 1) resolve("Yay! Success!");
        else reject(new Error("Oops! Not lookin' good"));
      }, 600);
    });
  },
} as CircularInegrationProps;
