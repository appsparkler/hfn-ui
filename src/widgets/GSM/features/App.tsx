import { Provider } from "react-redux";
import store from "./redux-app/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./router/router";

export const GSMApp: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} fallbackElement={<div>Loading...</div>} />
    </Provider>
  );
};
