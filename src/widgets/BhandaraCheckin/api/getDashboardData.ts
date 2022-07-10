import { GetDashboardDataApi } from "widgets/BhandaraCheckin/types";
import { checkinsCollection } from "widgets/BhandaraCheckin/firebase";
import { getDocs, query } from "firebase/firestore";

export const getDashboardData: GetDashboardDataApi = async () => {
  try {
    const queryForUserWithEmail = query(checkinsCollection);
    const docs = await getDocs(queryForUserWithEmail);
    return docs.size;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error("Oops! Couldn't get Docs Size");
  }
};
