import { ComponentMeta, ComponentStory } from "@storybook/react";
import { useCallback, useState } from "react";
import { ageGroupOptions, genderOptions } from "../../constants";
import { FormUserDetails } from "../../types";
import {
  SectionUpdateDetailsDispatchProps,
  SectionUpdateDetailsV2,
} from "./SectionUpdateDetails";

export default {
  title: "Widgets/Bhandara Checkin/Sections/Update Details V2",
  component: SectionUpdateDetailsV2,
} as ComponentMeta<typeof SectionUpdateDetailsV2>;

const Template: ComponentStory<typeof SectionUpdateDetailsV2> = ({
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
    <SectionUpdateDetailsV2
      {...args}
      userDetails={$userDetails}
      onChange={handleChange}
    />
  );
};

export const updateDetailsV2 = Template.bind({});
updateDetailsV2.args = {
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
    location: {
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
  },
};
