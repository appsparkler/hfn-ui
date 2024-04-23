import { doc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { firestoreDb } from "./firebase";
import { IQRCodeCheckinAPIPayload } from "../interfaces/api/IQRCodeCheckinAPIPayload";

export const checkinWithQRCode: (payload: IQRCodeCheckinAPIPayload) => void =
  (payload) => {
    const ref = doc(
      firestoreDb,
      "events",
      "202404_Bhandara",
      "checkins",
      `${payload.registrationId}-${payload.dormPreference}`
    );
    setDoc(ref, {
      ...payload,
      uid: getAuth().currentUser?.uid,
    });
  };
