import { ComponentMeta, ComponentStory } from "@storybook/react";
import { SectionUpdateDetails } from "./SectionUpdateDetails";

export default {
  title: "Widgets/Bhandara Checkin/Sections/Update Details",
  component: SectionUpdateDetails,
} as ComponentMeta<typeof SectionUpdateDetails>;

const Template: ComponentStory<typeof SectionUpdateDetails> = (args) => (
  <SectionUpdateDetails {...args} />
);
export const updateDetails = Template.bind({});
updateDetails.args = {
  isProcessing: false,
  userDetails: {
    fullName: {
      value: "Priyanka Patel",
      show: true,
      disabled: true,
    },
    mobile: {
      value: "+91339282838",
      show: true,
      disabled: true,
    },
    email: {
      value: "priyanka.patel@gmail.com",
      show: true,
      disabled: false,
    },
    location: {
      value: {
        id: 84770,
        name: "Bacita",
        state: "Kwara",
        country: "Nigeria",
        country_id: 417,
        state_id: 3107,
        c_id: 0,
        c_name: "",
        active: true,
        cityStateCountry: "Bacita, Kwara, Nigeria",
      },
      show: true,
    },
    ageGroup: {
      value: "0-10",
      show: true,
    },
    gender: {
      value: "female",
      show: true,
    },
  },
};
