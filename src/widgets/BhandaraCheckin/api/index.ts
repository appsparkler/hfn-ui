import { doc, DocumentReference, getDoc } from "firebase/firestore";
import {
  BhandaraCheckinAPIs,
  FirestoreCollections,
  ICheckinsMetaData,
} from "widgets/BhandaraCheckin/types";
import { firestoreDb } from "../firebase";
import { checkinAbhyasi } from "./checkinAbhyasi";
import { checkinWithEmailOrMobile } from "./checkinWithEmailorMobile";
import { checkinWithQRCode } from "./checkinWithQRCode";
import { getAppVersion } from "./getAppVersion";
import { getDataFromCache } from "./getDataFromCache";
import { isAbhyasiCheckedIn } from "./isAbhyasiCheckedIn";
import { isUserAlreadyCheckedIn } from "./isUserAlreadyCheckinIn";
import { signInAnonymously } from "./signInAnonymously";
import { signOutAnonymously } from "./signOutAnonymously";
import { updateMetadata } from "./updateMetadata";

export const apis: BhandaraCheckinAPIs = {
  checkinAbhyasi,
  checkinWithEmailOrMobile,
  checkinWithQRCode,
  getDataFromCache,
  isAbhyasiCheckedIn,
  isUserAlreadyCheckedIn,
  getAppVersion,
  signInAnonymously,
  signOutAnonymously,
  updateMetadata,
  getMetadata: async () => {
    const docRef = doc(
      firestoreDb,
      FirestoreCollections.META,
      "count"
    ) as DocumentReference<ICheckinsMetaData>;
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    throw new Error("Unable to fetch count metadata");
  },
};
