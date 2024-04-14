import { Provider } from "react-redux";
import { store } from "v1/app/store";
import { RouterProvider } from "react-router-dom";
import { browserRouter } from "v1/router";
import { getAuth, onAuthStateChanged } from "firebase/auth";

onAuthStateChanged(
  getAuth(),
  (user) => {
    debugger;
  },
  () => {
    debugger;
  }
);

export const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <RouterProvider router={browserRouter} />
    </Provider>
  );
};
