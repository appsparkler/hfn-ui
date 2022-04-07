import { SectionMainConnected } from "./SectionMainConnected";
import { configureStore } from "@reduxjs/toolkit";
import { bhandaraCheckinSlice } from "../../store/slices";
import { Provider } from "react-redux";

export type BhandaraCheckinWidgetProps = {};

export const BhandaraCheckinWidget = ({}: BhandaraCheckinWidgetProps) => {
  const store = configureStore({
    reducer: {
      bhandaraCheckin: bhandaraCheckinSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: {
          extraArgument: {
            apis: {},
          },
        },
      }),
  });
  // const {
  //   showMainSection,
  //   showCheckinSuccessSection,
  //   showUpdateDetailsSection,
  // } = useMemo<{
  //   showMainSection: boolean;
  //   showUpdateDetailsSection: boolean;
  //   showCheckinSuccessSection: boolean;
  // }>(
  //   () => ({
  //     showMainSection: currentSection === CurrentSection.MAIN,
  //     showUpdateDetailsSection:
  //       currentSection === CurrentSection.UPDATE_DETAILS,
  //     showCheckinSuccessSection:
  //       currentSection === CurrentSection.CHECKIN_SUCCESS,
  //   }),
  //   [currentSection]
  // );
  return (
    <Provider store={store}>
      <SectionMainConnected />
    </Provider>
  );
};
