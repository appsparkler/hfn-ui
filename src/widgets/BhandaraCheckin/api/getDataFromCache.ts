import { getDocsFromCache } from "firebase/firestore";
import { checkinsCollection } from "../firebase";
import {
  AbhyasiCheckinData,
  GetDataFromCacheApi,
  OfflineCacheData,
} from "widgets/BhandaraCheckin/types";

export const getDataFromCache: GetDataFromCacheApi = async () => {
  try {
    let data: OfflineCacheData[] = [];

    const checkinDocs = await getDocsFromCache(checkinsCollection);
    checkinDocs.forEach((doc) => {
      if (doc.metadata.hasPendingWrites) {
        data.push(doc.data() as AbhyasiCheckinData);
      }
    });
    return data;
  } catch (e) {
    return false;
  }
};
