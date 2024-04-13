import { IEmailOrMobileCheckinAPIPayload } from "v1/model/interfaces/api/IEmailOrMobileCheckinAPIPayload";
import { EmailOrMobileCheckinScreen } from "./EmailOrMobileCheckinScreen";
import { useAppDispatch, useAppSelector } from "v1/app/hooks";
import {
  emailOrMobileCheckinScreenActions,
  selectEmailOrMobileCheckinScreen,
} from "./emailOrMobileCheckinScreenSlice";
import { useMemo } from "react";
import { isEmpty } from "lodash/fp";
import { isValidEmail, isValidMobileNumber } from "v1/model/utils/validations";

export const EmailOrMobileCheckinScreenConnected: React.FC<{
  initialBatch: string;
  initialMobileNumber: string;
  initialEmailAddress: string;
  isEmailCheckin: boolean;
  onClickCancel: () => void;
}> = ({
  initialBatch,
  initialMobileNumber,
  initialEmailAddress,
  isEmailCheckin,
  onClickCancel,
}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectEmailOrMobileCheckinScreen);
  const handleChange = (
    updatedValue: Partial<IEmailOrMobileCheckinAPIPayload>
  ) => {
    dispatch(emailOrMobileCheckinScreenActions.updateAPIPayload(updatedValue));
  };

  const isValid = useMemo(
    () => isValidEmailOrMobileCheckinPayload(state),
    [state]
  );

  const handleClickCheckin = () => {};
  return (
    <EmailOrMobileCheckinScreen
      initialBatch={initialBatch}
      isMobileCheckin={isEmailCheckin}
      initialMobileNumber={initialMobileNumber}
      initialEmailAddress={initialEmailAddress}
      isCheckinDisabled={!isValid}
      onChange={handleChange}
      onClickCheckin={handleClickCheckin}
      onClickCancel={onClickCancel}
    />
  );
};

function isValidEmailOrMobileCheckinPayload({
  batch,
  fullName,
  ageGroup,
  gender,
  state,
  city,
  country,
  email,
  mobile,
}: IEmailOrMobileCheckinAPIPayload) {
  return (
    !isEmpty(batch) &&
    !isEmpty(fullName) &&
    !isEmpty(ageGroup) &&
    !isEmpty(gender) &&
    !isEmpty(state) &&
    !isEmpty(city) &&
    !isEmpty(country) &&
    isValidEmailAndMobile(email, mobile)
  );
}

function isValidEmailAndMobile(email: string, mobile: string) {
  if (isEmpty(email) && isEmpty(mobile)) return false;
  const isEmailValidBoolean = isValidEmail(email);
  const isMobileValidBoolean = isValidMobileNumber(mobile);
  if (!isEmpty(email) && !isEmpty(mobile))
    return isEmailValidBoolean && isMobileValidBoolean;
  return isEmailValidBoolean || isMobileValidBoolean;
}
