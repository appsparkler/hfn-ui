import { BhandaraCheckinWidget } from "./BhandaraCheckinWidget";
// import { mockedApis } from "widgets/BhandaraCheckin/mocked-api";
import { apis } from "widgets/BhandaraCheckin/api";

export const BhandaraCheckinWidgetDemo = () => {
  return <BhandaraCheckinWidget apis={apis} />;
};
