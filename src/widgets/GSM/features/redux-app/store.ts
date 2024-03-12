import { configureStore } from "@reduxjs/toolkit";
import { homeScreenReducer } from "../HomeScreen/homeScreenSlice";
import { successScreenReducer } from "../SuccessScreen/successScreenSlice";

const store = configureStore({
  reducer: {
    homeScreen: homeScreenReducer,
    successScreen: successScreenReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
