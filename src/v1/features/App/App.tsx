import { Provider } from "react-redux";
import { store } from "v1/app/store";
import { MainScreenConnected } from "../MainScreen/MainScreenConnected";

export const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <MainScreenConnected />
    </Provider>
  );
};
