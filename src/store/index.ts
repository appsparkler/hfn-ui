import { CurrentSection } from "../widgets/BhandaraCheckin/types";

export const store = "store";

export type RootState = {
  bhandaraCheckin: {
    currentSection: CurrentSection;
  };
};
