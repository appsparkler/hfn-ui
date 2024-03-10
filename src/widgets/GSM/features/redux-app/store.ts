import { configureStore } from "@reduxjs/toolkit";
import { homeScreenReducer } from "../HomeScreen/homeScreenSlice";

const store = configureStore({
  reducer: {
    homeScreen: homeScreenReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
