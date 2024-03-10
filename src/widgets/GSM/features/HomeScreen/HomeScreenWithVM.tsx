import React from "react";
import { HomeScreen } from "./HomeScreen";
import { ManualEntryUser } from "widgets/GSM/model/ManualEntryUser";

export const HomeScreenWithVM: React.FC<{}> = () => {
    
  return (
    <HomeScreen
      user={{
        checkinTime: Date.now(),
        email: "abc@def.com",
        mobileNo: "+918888",
        name: "Aakash",
        organization: "Cognizant",
        platform: "WEB",
        uid: "1234-user",
      }}
      checkinButtonDisabled={false}
      isScannerOn={false}
      onClickScannerSwitch={function (): void {
        throw new Error("Function not implemented.");
      }}
      onClickCheckin={function (): void {
        throw new Error("Function not implemented.");
      }}
      onClickScan={function (): void {
        throw new Error("Function not implemented.");
      }}
      onChangeUserDetails={function (user: ManualEntryUser): void {
        throw new Error("Function not implemented.");
      }}
    />
  );
};
