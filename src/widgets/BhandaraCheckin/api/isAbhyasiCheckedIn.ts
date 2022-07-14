import { IsAbhyasiCheckedInApi } from "widgets/BhandaraCheckin/types";
import { getDocsFromCache, query, where } from "firebase/firestore";
import { checkinsCollection } from "../firebase";

export const isAbhyasiCheckedIn: IsAbhyasiCheckedInApi = async (
  abhyasiId: string
) => {
  try {
    const $query = query(
      checkinsCollection,
      where("abhyasiId", "==", abhyasiId)
    );
    const docs = await getDocsFromCache($query);
    if (docs.empty) return false;
    return true;
  } catch (error) {
    throw new Error("Firebase Error");
  }
};
