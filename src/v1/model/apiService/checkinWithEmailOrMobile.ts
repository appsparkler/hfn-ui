import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ICheckinWIthQRApiStoreData } from "widgets/BhandaraCheckin/types";
import { firestoreDb } from "./firebase";
import { IQRCodeCheckinAPIPayload } from "../interfaces/api/IQRCodeCheckinAPIPayload";

export const checkinWithEmailOrMobile: (
  payload: ICheckinWIthQRApiStoreData | IQRCodeCheckinAPIPayload
) => void = (payload) => {
  const ref = doc(firestoreDb, "events", "202404_Bhandara", "checkins");
  setDoc(ref, {
    ...payload,
    uid: getAuth().currentUser?.uid,
  });
};
