import { IEmailOrMobileCheckinAPIPayload } from "v1/model/interfaces/api/IEmailOrMobileCheckinAPIPayload";
import { EmailOrMobileCheckinScreen } from "./EmailOrMobileCheckinScreen";
import { useAppDispatch, useAppSelector } from "v1/app/hooks";
import {
  checkinWithEmailOrMobile,
  emailOrMobileCheckinScreenActions,
  selectEmailOrMobileCheckinScreen,
} from "./emailOrMobileCheckinScreenSlice";
import { useEffect, useMemo } from "react";
import { isEmpty } from "lodash/fp";
import { isValidEmail, isValidMobileNumber } from "v1/model/utils/validations";

export const EmailOrMobileCheckinScreenConnected: React.FC<{
  initialBatch: string;
  initialMobileNumber: string;
  initialEmailAddress: string;
  isEmailCheckin: boolean;
  onClickCancel: () => void;
  onCheckin: () => void;
}> = ({
  initialBatch,
  initialMobileNumber,
  initialEmailAddress,
  isEmailCheckin,
  onClickCancel,
  onCheckin
}) => {
  const dispatch = useAppDispatch();
  const state = useAppSelector(selectEmailOrMobileCheckinScreen);
  const handleChange = (name: string, value: string) => {
    const updatedPayload = {
      ...state.apiPayload,
      [name]: value,
    };
    dispatch(
      emailOrMobileCheckinScreenActions.updateAPIPayload(updatedPayload)
    );
  };

  const isValid = useMemo(
    () => isValidEmailOrMobileCheckinPayload(state.apiPayload),
    [state]
  );

  const handleClickCheckin = () => {
    const checkinPayload = {
      ...state.apiPayload,
      timestamp: Date.now(),
    };
    if (isValid) {
      dispatch(checkinWithEmailOrMobile(checkinPayload));
      onCheckin()
    }
  };

  useEffect(() => {
    dispatch(
      emailOrMobileCheckinScreenActions.updateInitialData({
        batch: initialBatch,
        mobile: initialMobileNumber,
        email: initialEmailAddress,
      })
    );
  }, [dispatch, initialBatch, initialEmailAddress, initialMobileNumber]);

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
  const isValidEmailMobile = isValidEmailAndMobile(email, mobile);
  const isValid =
    !isEmpty(batch) &&
    !isEmpty(fullName) &&
    !isEmpty(ageGroup) &&
    !isEmpty(gender) &&
    !isEmpty(state) &&
    !isEmpty(city) &&
    !isEmpty(country) &&
    isValidEmailMobile;
  return isValid;
}

function isValidEmailAndMobile(email: string, mobile: string) {
  if (isEmpty(email) && isEmpty(mobile)) return false;
  const isEmailValidBoolean = isValidEmail(email);
  const isMobileValidBoolean = isValidMobileNumber(mobile);
  if (!isEmpty(email) && !isEmpty(mobile))
    return isEmailValidBoolean && isMobileValidBoolean;
  return isEmailValidBoolean || isMobileValidBoolean;
}
