import { IEmailOrMobileCheckinAPIPayload } from "v1/model/interfaces/api/IEmailOrMobileCheckinAPIPayload";
import { EmailOrMobileCheckinScreen } from "./EmailOrMobileCheckinScreen";

export const EmailOrMobileCheckinScreenConnected: React.FC<{
  initialBatch: string;
  initialMobileNumber: string;
  initialEmailAddress: string;
  isEmailCheckin: boolean;
}> = ({
  initialBatch,
  initialMobileNumber,
  initialEmailAddress,
  isEmailCheckin,
}) => {
  return (
    <EmailOrMobileCheckinScreen
      initialBatch={initialBatch}
      isMobileCheckin={isEmailCheckin}
      initialMobileNumber={initialMobileNumber}
      initialEmailAddress={initialEmailAddress}
      isCheckinDisabled={false}
      onClickCheckin={function (): void {
        throw new Error("Function not implemented.");
      }}
      onClickCancel={function (): void {
        throw new Error("Function not implemented.");
      }}
      onChange={function (
        updatedValue: Partial<IEmailOrMobileCheckinAPIPayload>
      ): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
