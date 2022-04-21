import { configureStore } from "@reduxjs/toolkit";
import { snackbarSlice } from "../../../components/Snackbar/snackbarSlice";
import { BhandaraCheckinAPIs } from "../types";
import { bhandaraCheckinSlice } from "./slices";
import { mainSectionSlice } from "../SectionMain/mainSectionSlice";
import { updateDetailsSectionSlice } from "../SectionUpdateDetails/updateDetailsSectionSlice";

export const rootReducer = {
  bhandaraCheckin: bhandaraCheckinSlice.reducer,
  mainSection: mainSectionSlice.reducer,
  updateDetailsSection: updateDetailsSectionSlice.reducer,
  snackbar: snackbarSlice.reducer,
};

const exampleStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          apis: {} as BhandaraCheckinAPIs,
        } as ThunkApiConfig["extra"],
      },
    }),
});

export type RootState = ReturnType<typeof exampleStore.getState>;

export type RootDispatch = typeof exampleStore.dispatch;

export type ThunkApiConfig = {
  extra: {
    apis: BhandaraCheckinAPIs;
  };
};

export * from "./slices";
export * from "./actions";
