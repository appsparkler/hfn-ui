import { IsAbhyasiCheckedInApi } from "widgets/BhandaraCheckin/types";
import { getDocsFromCache, query, where } from "firebase/firestore";
import { abhyasiIdCollection } from "../firebase";

export const isAbhyasiCheckedIn: IsAbhyasiCheckedInApi = async (
  abhyasiId: string
) => {
  const $query = query(
    abhyasiIdCollection,
    where("abhyasiId", "==", abhyasiId)
  );
  const docs = await getDocsFromCache($query);
  if (docs.empty) return false;
  return true;
};
