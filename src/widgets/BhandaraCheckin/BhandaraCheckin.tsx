import { SectionMainConnected } from "./SectionMainConnected";
import { configureStore } from "@reduxjs/toolkit";
import { bhandaraCheckinSlice } from "../../store/slices";
import { Provider } from "react-redux";
import { SectionUpdateDetailsConnected } from "./SectionUpdateDetailsConnected";
import { SectionCheckinSuccessConnected } from "./SectionCheckInSuccessConnected";
import { useMemo } from "react";

export type BhandaraCheckinWidgetProps = {};

export const BhandaraCheckinWidget = ({}: BhandaraCheckinWidgetProps) => {
  const store = useMemo(
    () =>
      configureStore({
        reducer: {
          bhandaraCheckin: bhandaraCheckinSlice.reducer,
        },
        middleware: (getDefaultMiddleware) =>
          getDefaultMiddleware({
            thunk: {
              extraArgument: {
                apis: {
                  testApi: () =>
                    new Promise((resolve) => {
                      setTimeout(() => resolve("done"), 600);
                    }),
                },
              },
            },
          }),
      }),
    []
  );
  return (
    <Provider store={store}>
      <SectionMainConnected />
      <SectionUpdateDetailsConnected />
      <SectionCheckinSuccessConnected />
    </Provider>
  );
};
