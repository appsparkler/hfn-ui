import {
  getAuth,
  signInAnonymously as firebaseSignInAnonymously,
} from "firebase/auth";

export const signInAnonymously: () => Promise<void> = async () => {
  try {
    await firebaseSignInAnonymously(getAuth());
  } catch (err) {
    const error = err as { code: number; message: string };
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    throw new Error(errorMessage);
  }
};
