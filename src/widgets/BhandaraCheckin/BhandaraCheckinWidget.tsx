import { SectionMainConnected } from "./SectionMain";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { SectionUpdateDetailsConnected } from "./SectionUpdateDetailsConnected";
import { SectionCheckinSuccessConnected } from "./SectionCheckInSuccessConnected";
import { useMemo } from "react";
import { BhandaraCheckinAPIs } from "./types";
import { BhandaraCheckinViewConnected } from "./BhandaraCheckinViewConnected";
import { rootReducer } from "./store";

export type BhandaraCheckinWidgetProps = {
  apis: BhandaraCheckinAPIs;
};

export type BhandaraCheckinViewStateProps = {
  showMain: boolean;
  showUpdateDetails: boolean;
  showCheckinSuccess: boolean;
};

export const BhandaraCheckinView = ({
  showMain,
  showUpdateDetails,
  showCheckinSuccess,
}: BhandaraCheckinViewStateProps) => {
  return (
    <>
      {showMain ? <SectionMainConnected /> : null}
      {showUpdateDetails ? <SectionUpdateDetailsConnected /> : null}
      {showCheckinSuccess ? <SectionCheckinSuccessConnected /> : null}
    </>
  );
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
      <BhandaraCheckinViewConnected />
    </Provider>
  );
};
