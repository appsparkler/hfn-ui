import { SectionMainConnected } from "./SectionMainConnected";
import { configureStore } from "@reduxjs/toolkit";
import { bhandaraCheckinSlice } from "../../store/slices";
import { Provider } from "react-redux";
import { SectionUpdateDetailsConnected } from "./SectionUpdateDetailsConnected";

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
  return (
    <Provider store={store}>
      <SectionMainConnected />
      <SectionUpdateDetailsConnected />
    </Provider>
  );
};
