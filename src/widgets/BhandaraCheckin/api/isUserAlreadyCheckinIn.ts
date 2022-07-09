import { IsUserAlreadyCheckedInApi } from "widgets/BhandaraCheckin/types";
import { otherCheckinsCollection } from "widgets/BhandaraCheckin/firebase";
import { getDocsFromCache, query, where } from "firebase/firestore";

export const isUserAlreadyCheckedIn: IsUserAlreadyCheckedInApi = async (
  user
) => {
  try {
    const queryForUserWithEmail = query(
      otherCheckinsCollection,
      where("name", "==", user.fullName),
      where("email", "==", (user as { email: string }).email)
    );
    const queryForUserWithMobile = query(
      otherCheckinsCollection,
      where("name", "==", user.fullName),
      where("mobile", "==", (user as { mobile: string }).mobile)
    );
    const docsMatchingEmail = await getDocsFromCache(queryForUserWithEmail);
    const docsMatchingMobile = await getDocsFromCache(queryForUserWithMobile);
    if (!docsMatchingEmail.empty || !docsMatchingMobile.empty) return true;
    return false;
  } catch (e) {
    console.error("Error adding document: ", e);
    return false;
  }
};
