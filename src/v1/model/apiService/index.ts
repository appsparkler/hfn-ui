import { isNull } from "lodash/fp";
import "./firebase";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";

export const getAnonymousUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(
      getAuth(),
      async (user) => {
        if (isNull(user)) {
          await signInAnonymously(getAuth());
          unsubscribe();
          resolve(user);
        } else {
          unsubscribe();
          resolve(user);
        }
      },
      (error) => {
        reject(error);
      }
    );
  });
};
