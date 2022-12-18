import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useCallback, useState } from "react";
import { ageGroupOptions, genderOptions } from "../../constants";
import { FormUserDetails } from "../../types";
import {
  SectionUpdateDetailsDispatchProps,
  SectionUpdateDetails,
} from "./SectionUpdateDetails";

export default {
  title: "Widgets/Bhandara Checkin/Sections/Update Details",
  component: SectionUpdateDetails,
} as ComponentMeta<typeof SectionUpdateDetails>;

const Template: ComponentStory<typeof SectionUpdateDetails> = ({
  userDetails,
  ...args
}) => {
  const [$userDetails, setUserDetails] = useState<FormUserDetails>(userDetails);

  const handleChange = useCallback<
    SectionUpdateDetailsDispatchProps["onChange"]
  >((userDetails) => {
    setUserDetails(userDetails);
    console.log(userDetails);
  }, []);

  return (
    <SectionUpdateDetails
      {...args}
      userDetails={$userDetails}
      onChange={handleChange}
    />
  );
};

export const updateDetails = Template.bind({});
updateDetails.args = {
  genderOptions: [...genderOptions],
  ageGroupOptions: [...ageGroupOptions],
  isProcessing: false,
  userDetails: {
    fullName: {
      value: "",
      show: true,
      disabled: true,
    },
    mobile: {
      value: "+917233293855",
      show: true,
      isValid: true,
      disabled: true,
    },
    email: {
      value: "",
      show: true,
      disabled: false,
    },
    city: {
      value: "",
      show: true,
    },
    state: {
      value: "",
      show: true,
    },
    country: {
      value: "",
      show: true,
    },
    ageGroup: {
      value: "",
      show: true,
      disabled: true,
    },
    gender: {
      value: "",
      show: true,
    },
    dormAndBerthAllocation: {
      value: "",
      show: true,
    },
  },
};
