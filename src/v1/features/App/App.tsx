import { Provider } from "react-redux";
import { store } from "v1/app/store";
import { RouterProvider } from "react-router-dom";
import { browserRouter } from "v1/router";
import { useEffect } from "react";
import { useAppDispatch } from "v1/app/hooks";
import { signInAnonymously } from "./appSlice";

const AppWithRouter = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(signInAnonymously());
  }, [dispatch]);
  return <RouterProvider router={browserRouter} />;
};

export const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <AppWithRouter />
    </Provider>
  );
};
