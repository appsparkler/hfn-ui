import { isNull } from "lodash/fp";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

export const getAnonymousUser = (): Promise<{ uid: string }> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      async (user) => {
        if (isNull(user)) {
          const creds = await signInAnonymously(getAuth());
          unsubscribe();
          resolve({
            uid: creds.user.uid,
          });
        } else {
          unsubscribe();
          resolve({
            uid: user.uid,
          });
        }
      },
      (error) => {
        reject(error);
        unsubscribe();
      }
    );
  });
};
