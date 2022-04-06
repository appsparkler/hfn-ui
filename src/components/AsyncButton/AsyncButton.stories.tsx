import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AsyncButton } from "./index";
import Box from "@mui/material/Box";

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
asyncButton.args = {};
