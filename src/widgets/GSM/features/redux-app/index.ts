import { configureStore } from "@reduxjs/toolkit";
import { homeScreenReducer } from "../HomeScreen/homeScreenSlice";

const store = configureStore({
  reducer: {
    homeScreen: homeScreenReducer,
  },
});

export default store;
