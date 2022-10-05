import { GetAppVersion } from "widgets/BhandaraCheckin/types";
import { doc, getDoc } from "firebase/firestore";
import { metaCollection } from "../firebase";

export const getAppVersion: GetAppVersion = async () => {
  try {
    const appMetaDocRef = doc(metaCollection, "app");
    const appMetaDoc = await getDoc(appMetaDocRef);
    if (appMetaDoc.exists()) {
      const versionNumber = appMetaDoc.data()?.version;
      return Number(versionNumber);
    }
    throw new Error("App Version not found");
  } catch (error) {
    throw new Error("Firebase Error");
  }
};
