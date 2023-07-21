import { getDocsFromCache } from "firebase/firestore";
import { checkinsCollection } from "../firebase";
import {
  GetDataFromCacheApi,
  OfflineCacheData,
} from "widgets/BhandaraCheckin/types";
import { IAbhyasiCheckinApiStoreData } from "widgets/BhandaraCheckin/types";

export const getDataFromCache: GetDataFromCacheApi = async () => {
  try {
    let data: OfflineCacheData[] = [];

    const checkinDocs = await getDocsFromCache(checkinsCollection);
    checkinDocs.forEach((doc) => {
      if (doc.metadata.hasPendingWrites) {
        data.push(doc.data() as IAbhyasiCheckinApiStoreData);
      }
    });
    return data;
  } catch (e) {
    return false;
  }
};
