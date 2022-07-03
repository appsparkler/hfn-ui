import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { useMemo } from "react";
import { BhandaraCheckinAPIs } from "../../types";
import { BhandaraCheckinViewConnected } from "./BhandaraCheckinViewConnected";
import { rootReducer } from "../../store";
import { ModeProviderConnected } from "./ModeProviderConnected";

export type BhandaraCheckinWidgetProps = {
  apis: BhandaraCheckinAPIs;
};

export type BhandaraCheckinViewStateProps = {
  showMain: boolean;
  showUpdateDetails: boolean;
  showCheckinSuccess: boolean;
};

export const BhandaraCheckinWidget = ({ apis }: BhandaraCheckinWidgetProps) => {
  const store = useMemo(
    () =>
      configureStore({
        reducer: rootReducer,
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
      <ModeProviderConnected>
        <BhandaraCheckinViewConnected />
      </ModeProviderConnected>
    </Provider>
  );
};
