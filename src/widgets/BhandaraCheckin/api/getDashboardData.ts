import { GetDashboardDataApi } from "widgets/BhandaraCheckin/types";
import { firestoreDb } from "widgets/BhandaraCheckin/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ICheckinsAggregateData } from "@hfn-checkins/types";

export const getDashboardData: GetDashboardDataApi = async () => {
  try {
    // const queryForUserWithEmail = query(checkinsCollection);

    if (navigator.onLine) {
      const aggregationsDocRef = doc(firestoreDb, "aggregations", "checkins");
      const aggregationsDoc = await getDoc(aggregationsDocRef);
      return aggregationsDoc.data() as ICheckinsAggregateData;
    }
    throw new Error("Offline Mode");
  } catch (e) {
    console.error("Error adding document: ", e);
    throw new Error(
      (e as unknown as Error)?.message || "Oops! Couldn't get Docs Size"
    );
  }
};
