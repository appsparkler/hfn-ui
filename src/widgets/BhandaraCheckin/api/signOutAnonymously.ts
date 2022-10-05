import { getAuth, signOut } from "firebase/auth";

export const signOutAnonymously = async () => {
  await signOut(getAuth());
};
