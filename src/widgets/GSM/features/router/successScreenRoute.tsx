import {
  LoaderFunction,
  RouteObject,
  redirect,
  useNavigate,
} from "react-router-dom";
import { SuccessScreenWithVM } from "../SuccessScreen/SuccessScreenWithVM";
import { AppRoutes } from "./AppRoutes";
import store from "../redux-app/store";
import { doc } from "firebase/firestore";
import { firestoreDb } from "../firebase-app";

const loader: LoaderFunction = () => {
  const state = store.getState();
  if (
    state.successScreen.manualEntryUser === null &&
    state.successScreen.qrUser === null
  ) {
    return redirect(AppRoutes.HOME_SCREEN);
  } else {
    if (firestoreDb) {
      doc(firestoreDb, "events/202403_GSM/checkins");
    }
    return null;
  }
};

const SuccessScreenComponent: React.FC<{}> = () => {
  const navigate = useNavigate();

  const handleNav = () => {
    navigate(AppRoutes.HOME_SCREEN);
  };

  return <SuccessScreenWithVM onClickGoToMainScreen={handleNav} />;
};

export const successScreenRoute: RouteObject = {
  path: AppRoutes.SUCCESS_SCREEN,
  Component: SuccessScreenComponent,
  loader,
};
