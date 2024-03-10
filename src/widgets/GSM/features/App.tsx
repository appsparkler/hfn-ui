import { Provider } from "react-redux";
import store from "./redux-app/store";
import { HomeScreenWithVM } from "./HomeScreen/HomeScreenWithVM";

export const GSMApp: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <HomeScreenWithVM />
    </Provider>
  );
};
