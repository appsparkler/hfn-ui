import {
  LoaderFunction,
  RouteObject,
  redirect,
  useNavigate,
} from "react-router-dom";
import { SuccessScreenWithVM } from "../SuccessScreen/SuccessScreenWithVM";
import { AppRoutes } from "./AppRoutes";
import store from "../redux-app/store";
import { Firestore, doc, setDoc } from "firebase/firestore";
import { firebaseAuth, firestoreDb } from "../firebase-app";
import { isNull } from "lodash";
import { ManualEntryUser } from "widgets/GSM/model/ManualEntryUser";
import { IQRUser } from "widgets/GSM/model/QRUser";

const addManualUserEntry = (firestoreDb: Firestore, user: ManualEntryUser) => {
  const { name, mobileNo, email } = user;
  const key = `${name}-${mobileNo}-${email}`;
  const eventId = "202403_GSM";
  const docRef = doc(firestoreDb, `events/${eventId}/checkins/${key}`);
  setDoc(docRef, {
    ...user,
    uid: firebaseAuth.currentUser?.uid,
    checkinTime: Date.now(),
  } as ManualEntryUser);
};

const loader: LoaderFunction = () => {
  const state = store.getState();
  if (
    state.successScreen.manualEntryUser === null &&
    state.successScreen.qrUser === null
  ) {
    return redirect(AppRoutes.HOME_SCREEN);
  } else {
    if (firestoreDb) {
      const manualEntryUser = state.successScreen.manualEntryUser;
      const qrUser = state.successScreen.qrUser;
      if (!isNull(manualEntryUser)) {
        addManualUserEntry(firestoreDb, manualEntryUser);
      } else if (!isNull(qrUser)) {
        addQRUserEntry(firestoreDb, qrUser);
      }
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
function addQRUserEntry(firestoreDb: Firestore, qrUser: IQRUser) {
  const { registrationId } = qrUser;
  const eventId = "202403_GSM";
  const docRef = doc(
    firestoreDb,
    `events/${eventId}/checkins/${registrationId}`
  );
  setDoc(docRef, {
    ...qrUser,
    uid: firebaseAuth.currentUser?.uid,
    checkinTime: Date.now(),
  } as IQRUser);
}
