import { Provider } from "react-redux";
import { store } from "v1/app/store";
import { RouterProvider } from "react-router-dom";
import { browserRouter } from "v1/router";

export const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={browserRouter} />
    </Provider>
  );
};
