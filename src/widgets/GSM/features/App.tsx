import { Provider } from "react-redux";
import store from "./redux-app/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";
import { CircularProgress } from "@mui/material";
import { Vertical } from "components";

const FallbackElem = () => (
  <Vertical justifyContent={"center"} alignItems={"center"} mt={10}>
    <CircularProgress size={50} />
  </Vertical>
);

export const GSMApp: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<FallbackElem />} />
    </Provider>
  );
};
