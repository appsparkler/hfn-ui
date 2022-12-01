import { BhandaraCheckinWidget } from "./BhandaraCheckinWidget";
import { mockedApis } from "widgets/BhandaraCheckin/mocked-api";

export const BhandaraCheckinWidgetDemo = () => {
  return <BhandaraCheckinWidget apis={mockedApis} />;
};
