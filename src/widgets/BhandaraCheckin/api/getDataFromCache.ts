import { collection, getDocsFromCache } from "firebase/firestore";
import { firestoreDb } from "../firebase";
import {
  AbhyasiCheckinData,
  CheckinEmailOrMobileUserDetails,
  FirestoreCollections,
  GetDataFromCacheApi,
  OfflineCacheData,
} from "widgets/BhandaraCheckin/types";

export const getDataFromCache: GetDataFromCacheApi = async () => {
  try {
    let data: OfflineCacheData[] = [];
    const abhyasIdCollection = collection(
      firestoreDb,
      FirestoreCollections.ABHYASI_ID_CHECKINS
    );
    const docs = await getDocsFromCache(abhyasIdCollection);
    docs.forEach((doc) => {
      if (doc.metadata.hasPendingWrites) {
        data.push(doc.data as unknown as AbhyasiCheckinData);
      }
    });

    // Other Checkins
    const otherCheckinsCollection = collection(
      firestoreDb,
      FirestoreCollections.OTHER_CHECKINS
    );
    const otherCheckinDocs = await getDocsFromCache(otherCheckinsCollection);
    otherCheckinDocs.forEach((doc) => {
      if (doc.metadata.hasPendingWrites) {
        data.push(doc.data as unknown as CheckinEmailOrMobileUserDetails);
      }
    });
    return data;
  } catch (e) {
    return false;
  }
};
