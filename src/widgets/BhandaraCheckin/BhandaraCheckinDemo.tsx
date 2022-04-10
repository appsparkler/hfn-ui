import { BhandaraCheckinWidget } from "./BhandaraCheckinWidget";

export const BhandaraCheckinWidgetDemo = () => {
  return (
    <BhandaraCheckinWidget
      apis={{
        getIsUserCheckedIn: () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve(false);
            }, 600);
          }),

        getUserDetails: () =>
          new Promise((resolve) => {
            setTimeout(() => {
              resolve({
                email: "abc@def.com",
                fullName: "Prakash Shah",
                gender: "Male",
                location: "Telangana, Hyderabad, India",
                ageGroup: "30-35",
              });
            }, 600);
          }),
      }}
    />
  );
};
