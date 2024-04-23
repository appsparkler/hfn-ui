import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

import { IAbhyasiIdCheckinAPIPayload } from "../interfaces/api/IAbhyasiIdCheckinAPIPayload";
import { firestoreDb } from "./firebase";

export const checkinWithAbhyasiId: (
  payload: IAbhyasiIdCheckinAPIPayload
) => void = (payload) => {
  const ref = doc(
    firestoreDb,
    "events",
    "202404_Bhandara",
    "checkins",
    payload.abhyasiId
  );
  setDoc(ref, {
    ...payload,
    uid: getAuth().currentUser?.uid,
  });
};
