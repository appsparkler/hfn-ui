import { SectionMainConnected } from "./SectionMainConnected";
import { configureStore } from "@reduxjs/toolkit";
import { bhandaraCheckinSlice } from "../../store/slices";
import { Provider } from "react-redux";
import { SectionUpdateDetailsConnected } from "./SectionUpdateDetailsConnected";
import { SectionCheckinSuccessConnected } from "./SectionCheckInSuccessConnected";
import { useMemo } from "react";
import { BhandaraCheckinAPIs } from "../../store";

export type BhandaraCheckinWidgetProps = {
  apis: BhandaraCheckinAPIs;
};

export const BhandaraCheckinWidget = ({ apis }: BhandaraCheckinWidgetProps) => {
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
                apis,
              },
            },
          }),
      }),
    [apis]
  );
  return (
    <Provider store={store}>
      <SectionMainConnected />
      <SectionUpdateDetailsConnected />
      <SectionCheckinSuccessConnected />
    </Provider>
  );
};
