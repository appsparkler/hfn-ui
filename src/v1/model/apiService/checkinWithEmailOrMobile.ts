import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestoreDb } from "./firebase";
import { IEmailOrMobileCheckinAPIPayload } from "../interfaces/api/IEmailOrMobileCheckinAPIPayload";

export const checkinWithEmailOrMobile: (
  payload: IEmailOrMobileCheckinAPIPayload
) => void = (payload) => {
  const ref = doc(
    firestoreDb,
    "events",
    "202404_Bhandara",
    "checkins",
    `${payload.mobile}-${payload.fullName}-${payload.email}`
  );
  setDoc(ref, {
    ...payload,
    uid: getAuth().currentUser?.uid,
  });
};
